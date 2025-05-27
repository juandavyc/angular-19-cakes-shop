import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'authenticated',
    loadChildren: () => import('./features/authenticated/authenticated.routes')
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
