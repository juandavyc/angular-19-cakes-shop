import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';


const AuthRoutes: Routes = [

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        data: { title: 'login' }
      },
      {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.component'),
        data: { title: 'Singup' }
      },
      {
        path: 'recovery',
        loadComponent: () => import('./pages/recovery/recovery.component'),
        data: { title: 'Recovery' }
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

export default AuthRoutes;
