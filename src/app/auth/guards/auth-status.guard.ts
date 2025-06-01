import { effect, inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

export const AuthStatusGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  effect(() => {
    const authStatus = authService.authStatus();
    if (authStatus === 'not-authenticated') {
      router.navigate(['/login'])
      return false;
    }
    else {
      return true;
    }
  })

  return true;
}
