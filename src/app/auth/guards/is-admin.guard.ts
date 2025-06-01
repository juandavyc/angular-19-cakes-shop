import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { map } from 'rxjs';

export const IsAdminGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {

  const authService = inject(AuthService);

  // const isAdmin = authService.user()?.roles.some(role => role === 'ROLE_ADMIN');

  // console.log({ isAdmin });

  const user =  authService.user();
  if(!user) return false;

  const isAdmin = user.roles
    .map(role=>role.split('_').pop())
    //.some(role=>role ==='ADMIN');

  return true;
}
