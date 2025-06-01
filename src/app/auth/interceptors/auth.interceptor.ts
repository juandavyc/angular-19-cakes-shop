import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "@auth/services/auth.service";
import { catchError, startWith, switchMap, throwError } from 'rxjs';
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn) {

  const excludedUrls = [
    apiUrl + '/auth/login',
    apiUrl + '/auth/register',
    apiUrl + '/auth/refresh',
    apiUrl + '/public',
  ];

  if (excludedUrls.some(url => req.url.startsWith(url))) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.token();

  if (!token) {
    return next(req);
  }

  const authRequest = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  })


  return next(authRequest).pipe(
  catchError(error => {
    if (error.status === 401 && !req.url.includes('/auth/refresh')) {
      return authService.refresh().pipe(
        switchMap(() => {
          const newToken = authService.token();
          const newRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${newToken}`),
          });
          return next(newRequest);
        }),
        catchError(refreshError => {
          authService.logout();
          return throwError(() => refreshError);
        })
      );
    }
    return throwError(() => error);
  })
);


}
