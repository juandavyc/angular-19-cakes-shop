import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces';
import { PlatformIdService } from '@shared/service/platform-id.service';
import { RatingComponent } from '../rating/rating.component';


@Component({
  selector: 'product-item',
  imports: [
    RouterLink,
    RatingComponent,
    TitleCasePipe,
    DecimalPipe
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {


  public productInput = input.required<Product>();
 // public addToCartOutput = output<void>();
  public productSlug = output<string>();

  // public addToCart():void{
  //   this.addToCartOutput.emit();
  // }


}
