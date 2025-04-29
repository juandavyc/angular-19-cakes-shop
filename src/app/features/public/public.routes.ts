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
        path: 'contact-us',
        component: ContactUsComponent,
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

export default PublicRoutes;
