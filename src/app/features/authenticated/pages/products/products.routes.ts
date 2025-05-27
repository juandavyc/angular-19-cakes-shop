import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';



const ProductsRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/list/list.component'),
        data: { title: 'List' }
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./pages/edit/edit.component'),
        data: { title: 'Edit' }
      },
       {
        path: 'add',
        loadComponent: () => import('./pages/add/add.component'),
        data: { title: 'add' }
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

export default ProductsRoutes;
