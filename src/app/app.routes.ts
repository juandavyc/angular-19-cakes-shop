import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { ShopComponent } from './features/shop/shop.component';
import { ContactComponent } from './features/contact/contact.component';
import { title } from 'process';

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
    component: ShopComponent,
    data: { title: 'Shop' }
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
