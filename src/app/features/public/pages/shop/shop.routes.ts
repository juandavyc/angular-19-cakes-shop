import { Routes } from "@angular/router";
import { ShopComponent } from "./shop.component";
import { ShopLayoutComponent } from "./layouts/shop-layout/shop-layout.component";

const ShopRoutes: Routes = [
  {
    path: '',
    component: ShopLayoutComponent,
    children: [
      {
        path: '',
        component: ShopComponent,
      },
      {
        path: ':occasion',
        component: ShopComponent,
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

export default ShopRoutes;
