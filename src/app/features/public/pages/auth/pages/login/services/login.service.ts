import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }


  public login(username: string, password: string): Observable<boolean> {
    return of((username === 'jb' && password === 'tara123'))
      .pipe(
        delay(2000)
      )
  }

}
