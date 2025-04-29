import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';

import { ScrollService } from '@shared/service/scroll.service';
import { CartProductItemComponent } from './components/cart-product-item/cart-product-item.component';
import { CartRemoveModalComponent } from '../cart-remove-modal/cart-remove-modal.component';
import { CartService } from '@public/pages/cart/services/cart.service';
import { CartProduct } from '@public/pages/cart/interfaces';
import { ChangeQuantity } from '@public/pages/cart/enums/change-quantity.enums';

enum ScrollDirection {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
}

@Component({
  selector: 'cart-product-preview',
  imports: [
    CartProductItemComponent,
    CartRemoveModalComponent,
    DecimalPipe,
  ],
  templateUrl: './cart-product-preview.component.html',
  styleUrl: './cart-product-preview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductPreviewComponent {

  public scrollDirection = ScrollDirection;

  private cartService = inject(CartService);
  private scrollService = inject(ScrollService);

  private cartProductToRemove = signal<string>('');

  private cartProductsContainer = viewChild<ElementRef<HTMLDivElement>>('cartProductsContainer');

  private cartRemoveModal = viewChild<CartRemoveModalComponent>('cartRemoveModal');

  public cartProducts = computed<CartProduct[]>(() => this.cartService.getCarProducts());
  public cartTotal = computed(() => this.cartService.total());


  public changeQuantity(changeQuantity: ChangeQuantity, id: string, quantity: number): void {

    if (changeQuantity == ChangeQuantity.INCREMENT) {
      this.cartService.incrementQuantity(id);
    }
    else {
      if (quantity == 1) {
        this.removeCartProduct(id);
      }
      else {
        this.cartService.decrementQuantity(id);
      }
    }

  }

  public removeCartProduct(id: string): void {
    const removeModal = this.cartRemoveModal();
    if (!removeModal) return;
    this.cartProductToRemove.set(id);
    removeModal.openModal(true);
  }

  public scrollCartProductsContainer(direction: ScrollDirection) {
    const container = this.cartProductsContainer();
    if (!container) return;
    switch (direction) {
      case ScrollDirection.TOP:
        this.scrollService.scrollTop(container.nativeElement);
        break;
      case ScrollDirection.BOTTOM:
        this.scrollService.scrollBottom(container.nativeElement);
        break;
      case ScrollDirection.LEFT:
        this.scrollService.scrollLeft(container.nativeElement);
        break;
      case ScrollDirection.RIGHT:
        this.scrollService.scrollRight(container.nativeElement);
        break;
      default: console.error("cannot move the scroll")
    }
  }

  public confirmRemoveCartProduct() {
    this.cartService.removeProduct(this.cartProductToRemove());
  }

}
