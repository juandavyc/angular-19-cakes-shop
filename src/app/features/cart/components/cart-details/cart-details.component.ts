import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartProduct } from '../../interfaces';
import { DecimalPipe } from '@angular/common';
import { ScrollService } from '@shared/service/scroll.service';

@Component({
  selector: 'cart-details',
  imports: [
    DecimalPipe,
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsComponent {


  private cartService = inject(CartService);
  private scrollService = inject(ScrollService);


  private removeLastUnitModal = viewChild<ElementRef<HTMLDialogElement>>('removeLastUnitModal');
  private divToScroll = viewChild<ElementRef<HTMLDivElement>>('divToScroll');


  public cartProducts = computed<CartProduct[]>(() => this.cartService.getCarProducts());

  private productToRemove = signal<CartProduct | null>(null);

  public cartTotal = computed(() => this.cartService.total());



  public scrollLeft() {
    if (this.divToScroll()) {
      this.scrollService.scrollLeft(this.divToScroll()!.nativeElement);
    }
  }


  public incrementQuantity(cartProduct: CartProduct): void {
    this.cartService.incrementQuantity(cartProduct)
  }

  public decrementQuantity(cartProduct: CartProduct): void {
    if (cartProduct.quantity === 1) {
      this.toggleRemoveModal(true);
      this.productToRemove.set(cartProduct);
    }
    else {
      this.cartService.decrementQuantity(cartProduct);
    }
  }

  toggleRemoveModal(open: boolean) {
    const decrementModal = this.removeLastUnitModal();
    if (decrementModal) {
      if (open) {
        decrementModal.nativeElement.showModal();
      }
      else {
        decrementModal.nativeElement.close();
      }
    }
  }

  confirmProductRemoval() {
    const product = this.productToRemove();
    if (product) {
      this.cartService.decrementQuantity(product);
      this.productToRemove.set(null);
      this.toggleRemoveModal(false);
    }
  }


}
