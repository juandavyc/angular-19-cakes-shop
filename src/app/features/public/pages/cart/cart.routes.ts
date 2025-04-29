import { Routes } from "@angular/router";
import { CartLayoutComponent } from "./layouts/cart-layout/cart-layout.component";
import { CartComponent } from "./cart.component";

const CartRoutes: Routes = [
  {
    path: '',
    component: CartLayoutComponent,
    children: [
      {
        path: '',
        component: CartComponent,
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

export default CartRoutes;
