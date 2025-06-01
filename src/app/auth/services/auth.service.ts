import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse, MeResponse, Token, User } from '@auth/interfaces';
import { PlatformIdService } from '@shared/service/platform-id.service';
import { response } from 'express';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private platformIdService = inject(PlatformIdService);

  private _authStatus = signal<AuthStatus>('checking');

  private _user = signal<User | null>(null);
  private _token = signal<string | null>(this.getLocalStorageItem('token'))
  private _refreshToken = signal<string | null>(this.getLocalStorageItem('refreshToken'))

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  // cache
  private authCache = new Map<string, MeResponse>();


  private setLocalStorageItem(item: string, value: string): void {
    if (this.platformIdService.isBrowser()) {
      localStorage.setItem(item, value);
    }
  }

  private getLocalStorageItem(item: string): string | null {
    if (this.platformIdService.isBrowser()) {
      return localStorage.getItem(item);
    }
    else {
      return null;
    }
  }

  private removeLocalStorage(): void {
    if (this.platformIdService.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  }

  public authStatus = computed(() => {
    if (this._authStatus() === 'checking') {
      return 'checking';
    }
    if (this._user()) {
      return 'authenticated';
    }
    else {
      return 'not-authenticated';
    }
  })


  public user = computed(() => this._user())
  public token = computed(() => this._token())
  public refreshToken = computed(() => this._refreshToken())

  public login(username: string, password: string): Observable<Boolean> {
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post<AuthResponse>(url, { username, password }).pipe(
      tap(response => this.handleAuthSuccess(response.user)),
      tap(response => {
        this.authCache.set(response.token.accessToken, response.user)
      }),
      tap(response => {
        this._token.set(response.token.accessToken);
        this._refreshToken.set(response.token.refreshToken);
        this.setLocalStorageItem('token', response.token.accessToken);
        this.setLocalStorageItem('refreshToken', response.token.refreshToken);
      }),
      map(() => true),
      catchError((error) => this.handleAuthError(error)),
    )
  }

  public refresh(): Observable<boolean> {
    const refreshToken = this.refreshToken();
    if (!refreshToken) {
      this.logout();
      return of(false);
    }
    const url = `${this.apiUrl}/auth/refresh`;
    return this.http.post<Token>(url, { refreshToken }).pipe(
      tap(response => {
        this._token.set(response.accessToken);
        this._refreshToken.set(response.refreshToken);
        this.setLocalStorageItem('token', response.accessToken);
        this.setLocalStorageItem('refreshToken', response.refreshToken);
        this.authCache.clear();
      }),
      switchMap(() => this.checkStatus()),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  public logout() {
    this._user.set(null);
    this._token.set(null);
    this._refreshToken.set(null);
    this._authStatus.set('not-authenticated');
    this.removeLocalStorage();
  }

  public checkStatus(): Observable<boolean> {
    const token = this.getLocalStorageItem('token');
    if (!token) {
      this.logout();
      return of(false)
    }
    if (this.authCache.has(token)) {
      if (this.isTokenExpired(token)) {
        this.logout();
        return of(false)
      }
      else {
        return of(true)
      }
    }

    const url = `${this.apiUrl}/auth/me`;
    return this.http.get<MeResponse>(url).pipe(
      tap(response => this.handleAuthSuccess(response)),
      tap(response => {
        this.authCache.set(token, response)
      }),
      map(() => true),
      catchError((error) => this.handleAuthError(error)),
    )
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (e) {
      return true; // si no se puede decodificar, considerar inválido
    }
  }

  private handleAuthSuccess(response: User) {
    this._user.set(response);
    this._authStatus.set('authenticated');
  }

  private handleAuthError(error: any): Observable<false> {
    this.logout();
    return of(false);
  }

}
