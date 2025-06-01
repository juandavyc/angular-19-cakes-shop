import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { ShopComponent } from "./pages/list/shop.component";
import { ProductComponent } from "./pages/product/product.component";



const ShopRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ShopComponent,
      },
      {
        path: 'product/:slug',
        component: ProductComponent,
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
