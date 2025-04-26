import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CartService } from 'src/app/features/cart/services/cart.service';
import { Product } from 'src/app/features/shop/interfaces';

@Component({
  selector: 'purshase-controls',
  imports: [

  ],
  templateUrl: './purshase-controls.component.html',
  styleUrl: './purshase-controls.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurshaseControlsComponent {



  private cartService = inject(CartService);

  public productInput = input<Product | null>();

  public buyProduct(product: Product | null | undefined): void {
    if (product) {
      console.log("id:", product);
    }
  }

  public addToCart(product: Product | null | undefined) {
    if(product){
      this.cartService.addProduct(product);
    }
  }

}
