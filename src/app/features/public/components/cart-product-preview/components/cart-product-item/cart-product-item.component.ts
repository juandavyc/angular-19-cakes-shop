import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChangeQuantity } from '@public/pages/cart/enums/change-quantity.enums';
import { CartProduct } from '@public/pages/cart/interfaces';
import { TruncatePipe } from '@shared/pipes/truncate.pipe';

@Component({
  selector: 'cart-product-item',
  imports: [
    RouterLink,
    DecimalPipe,
    TitleCasePipe,
    TruncatePipe,
  ],
  host:{
    'class': 'stat px-2 py-1 md:w-[250px] w-full'
  },
  templateUrl: './cart-product-item.component.html',
  styleUrl: './cart-product-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductItemComponent {

  public changeQuantity = ChangeQuantity;
  public cartProductInput = input.required<CartProduct>();

  public changeQuantityOutput = output<number>();
  public removeCartProductOutput = output<string>();

  public changeQuantityCartProduct(quantity: ChangeQuantity): void {
    this.changeQuantityOutput.emit(quantity);
  }

  public removeCartProduct(id: string): void {
    this.removeCartProductOutput.emit(id);
  }

}
