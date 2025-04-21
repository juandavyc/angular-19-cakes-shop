import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: { title: 'About us' }
  },
  {
    path: 'shop',
    loadChildren: () => import('./features/shop/shop.routes'),
    data: { title: 'Shop' }
  },
  {
    path: 'product',
    loadChildren: () => import('./features/product/product.routes'),
    data: { title: 'Product' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contact' }
  },
  {
    path: '**',
    redirectTo: ''
  }

];
