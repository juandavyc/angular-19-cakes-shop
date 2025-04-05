import { Routes } from "@angular/router";
import { ShopComponent } from "./shop.component";

const ShopRoutes: Routes = [
  {
    path: '',
    component: ShopComponent
  },
  {
    path: ':occasion',
    component: ShopComponent
  },
  {
    path: '**',
    redirectTo: ''
  }

];

export default ShopRoutes;
