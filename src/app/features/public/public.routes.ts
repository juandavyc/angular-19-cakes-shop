import { Routes } from "@angular/router";
import { PublicComponent } from "./public.component";
import { HomeComponent } from "./pages/home/home.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";

const PublicRoutes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'about-us',
        loadComponent: () => import('./pages/about-us/about-us.component'),
        data: { title: 'About us' }
      },
      {
        path: 'shop',
        loadChildren: () => import('./pages/shop/shop.routes'),
        data: { title: 'Shop' }
      },
      {
        path: 'product',
        loadChildren: () => import('./pages/product/product.routes'),
        data: { title: 'Product' }
      },
      {
        path: 'pay',
        loadChildren: () => import('./pages/pay/pay.routes'),
        data: { title: 'Pay' }
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        data: { title: 'Contact-us' }
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/auth/auth.routes'),
        data: { title: 'Login' }
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];

export default PublicRoutes;
