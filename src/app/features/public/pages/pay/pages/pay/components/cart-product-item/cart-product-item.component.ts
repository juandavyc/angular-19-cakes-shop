import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChangeQuantity } from '@public/pages/cart/enums/change-quantity.enums';
import { CartProduct } from '@public/pages/cart/interfaces';

@Component({
  selector: 'cart-product-item',
  imports: [
    RouterLink,
    TitleCasePipe,
    DecimalPipe,
  ],
  // host:{
  //   'class': 'list-row text-base hover:bg-base-100'
  // },
  templateUrl: './cart-product-item.component.html',
  styleUrl: './cart-product-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductItemComponent {

  public readonly changeQuantity = ChangeQuantity;

  public cartProductItemInput = input.required<CartProduct>();

  public productToPayOutput = output<boolean>();

  public changeQuantityOutput = output<ChangeQuantity>();

  public removeCartProductOutput = output<string>();

}
