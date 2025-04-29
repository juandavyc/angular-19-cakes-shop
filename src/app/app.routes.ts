import { Routes } from '@angular/router';
import PublicRoutes from './features/public/public.routes';

export const routes: Routes = [

  {
    path: '',
    children: PublicRoutes
  },
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  // {
  //   path: 'about-us',
  //   component: AboutUsComponent,
  //   data: { title: 'About us' }
  // },
  // {
  //   path: 'shop',
  //   loadChildren: () => import('./features/public/shop/shop.routes'),
  //   data: { title: 'Shop' }
  // },
  // {
  //   path: 'product',
  //   loadChildren: () => import('./features/product/product.routes'),
  //   data: { title: 'Product' }
  // },
  // {
  //   path: 'contact',
  //   component: ContactComponent,
  //   data: { title: 'Contact' }
  // },
  {
    path: '**',
    redirectTo: ''
  }

];
