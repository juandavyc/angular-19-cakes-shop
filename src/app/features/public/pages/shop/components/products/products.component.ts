import { ChangeDetectionStrategy, Component, inject, input, ResourceRef } from '@angular/core';
import { Product, ShopResponse } from '../../interfaces';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { PaginationFormComponent } from '../pagination-form/pagination-form.component';
import { Pagination } from '@shared/interfaces';
import { CartService } from '@public/pages/cart/services/cart.service';

@Component({
  selector: 'products',
  imports: [
    SkeletonComponent,
    ProductItemComponent,
    PaginationFormComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {

  private cartService = inject(CartService);

  public skeletonCount = Array.from({length: 8});

  public shopRxResourceInput = input.required<ResourceRef<ShopResponse | undefined>>();

  public shopPaginationInput = input<Pagination | null>();


  public addProductToCart(product: Product){
    this.cartService.addProduct(product);
  }
}
