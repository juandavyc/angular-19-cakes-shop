import { ChangeDetectionStrategy, Component, input, ResourceRef } from '@angular/core';
import { ShopResponse } from '../../interfaces';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { PaginationFormComponent } from '../pagination-form/pagination-form.component';
import { Pagination } from '@shared/interfaces';

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

  public skeletonCount = Array.from({length: 8});

  public shopRxResourceInput = input.required<ResourceRef<ShopResponse | undefined>>();

  public shopPaginationInput = input<Pagination | null>();

}
