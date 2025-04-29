import { Routes } from "@angular/router";
import { ProductLayoutComponent } from "./layouts/product-layout/product-layout.component";


const ProductRoutes: Routes = [
  {
    path: '',
    component: ProductLayoutComponent,
    children: [
      {
        path: ':slug',
        loadComponent: () => import('./pages/by-slug/by-slug.component'),
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

export default ProductRoutes;
