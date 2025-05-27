import { ChangeDetectionStrategy, Component, inject, input, output, ResourceRef } from '@angular/core';
import { Product, ShopResponse } from '../../interfaces';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Pagination } from '@shared/interfaces';
import { CartService } from '@public/pages/cart/services/cart.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';

@Component({
  selector: 'products',
  imports: [
    SkeletonComponent,
    ProductItemComponent,
    PaginationComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {

  private cartService = inject(CartService);

  public readonly skeletonCount = Array.from({length: 8});

  public productsListRx = input.required<ResourceRef<ShopResponse | undefined>>();

  public productsPagination = input<Pagination | null>();

  public productSlug = output<string>();

  public changePage = output<number>();


  public addProductToCart(product: Product){
    this.cartService.addProduct(product);
  }



}
