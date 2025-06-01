import { Routes } from '@angular/router';
import { AuthStatusGuard } from '@auth/guards/auth-status.guard';
import { AuthenticatedGuard } from '@auth/guards/authenticated.guard';

export const routes: Routes = [

  {
    path: 'authenticated',
    loadChildren: () => import('./features/authenticated/authenticated.routes'),
    canMatch:[
      AuthenticatedGuard,
      AuthStatusGuard,
    ]
  },
  {
    path: '',
    loadChildren: () => import('./features/public/public.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
