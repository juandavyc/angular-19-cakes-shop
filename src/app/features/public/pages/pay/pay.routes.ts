import { Routes } from "@angular/router";
import { PayLayoutComponent } from "./layouts/pay-layout.component";


const PayRoutes: Routes = [
  {
    path: '',
    component: PayLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/pay/pay.component'),
      },
      {
        path: 'orders/:order',
        loadComponent: () => import('./pages/order/order.component'),
      },
      {
        path: '**',
        redirectTo: '/shop'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/shop'
  }
];

export default PayRoutes;
