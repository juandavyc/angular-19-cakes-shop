import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { IsAdminGuard } from '@auth/guards/is-admin.guard';

const AuthenticatedRoutes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/products/products.routes'),
        data: { title: 'Productos' },
        canMatch:[
          IsAdminGuard,
        ]
      },
      // TODO: cambiar
      // {
      //   path: 'orders',
      //   loadComponent: () => import('./pages/orders/orders.component'),
      //   data: { title: 'Pedidos' }
      // }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }

];

export default AuthenticatedRoutes;
