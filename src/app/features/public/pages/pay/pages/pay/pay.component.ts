import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { CartService } from '@public/pages/cart/services/cart.service';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { PayService } from '../../services/pay.service';
import { DecimalPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { CartProduct } from '@public/pages/cart/interfaces';
import { ChangeQuantity } from '@public/pages/cart/enums/change-quantity.enums';
import { CartRemoveModalComponent } from '@public/components/cart-remove-modal/cart-remove-modal.component';
import { Router, RouterLink } from '@angular/router';
import { Summary } from './interfaces';
import { PaySummaryComponent } from './components/pay-summary/pay-summary.component';
import { CartProductItemComponent } from './components/cart-product-item/cart-product-item.component';
import { CheckoutRequest } from '../../interfaces/checkout-request.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { filter, of, tap } from 'rxjs';

@Component({
  selector: 'app-pay',
  imports: [
    HeroTitleComponent,
    CartRemoveModalComponent,
    //cm
    PaySummaryComponent,
    CartProductItemComponent,
  ],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PayComponent {


  public readonly title = 'Pagar';
  public readonly subtitle = 'Confirme sus productos';

  public readonly changeQuantity = ChangeQuantity;

  private cartService = inject(CartService);
  private payService = inject(PayService);
  private router = inject(Router);

  private cartProductToRemove = signal<string>('');

  private cartRemoveModal = viewChild<CartRemoveModalComponent>('cartRemoveModal');
  private cartRemoveToPayModal = viewChild<CartRemoveModalComponent>('cartRemoveToPayModal');


  private payload = signal<CheckoutRequest | null>(null);

  public cartProducts = computed<CartProduct[]>(() => {
    const products = this.cartService.getCarProducts();
    if (products.length > 0) return products;
    else return [];
  });


  public summary = computed<Summary>(() => {
    return this.cartProducts()
      .reduce((acc, cartProduct) => {
        if (cartProduct.pay) {
          acc.total += cartProduct.price * cartProduct.quantity,
            acc.quantity++;
        }
        return acc;
      }, { total: 0, quantity: 0 })
  });

  public hasProductsToPay = computed(() => this.cartProducts().some(cartProduct => cartProduct.pay == true))

  //request: () => ({ form: this.payload() }),
  public payloadRx = rxResource({
    request: () => ({ order: this.payload() }),
    loader: (params) => {
      if(params.request.order){
        return this.payService.create(params.request.order).pipe(
          filter(response=> response != null),
          tap(()=>this.cartService.removeAllProducts()),
          tap((response)=>{
            const id = response.split('/').pop();
            this.router.navigate(['/pay/orders',id]);
          })
        )
      }
      else{
        return of(null);
      }
    }
  })




  public changeQuantityProduct(changeQuantity: ChangeQuantity, id: string, quantity: number): void {
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
  public removeToPayProducts(): void {
    const removeModal = this.cartRemoveToPayModal();
    if (!removeModal) return;
    removeModal.openModal(true);
  }

  public confirmRemoveCartProduct() {
    this.cartService.removeProduct(this.cartProductToRemove());
  }
  public confirmRemoveToPayProducts() {
    this.cartService.removeToPayProducts();
  }

  public productToPay(id: string, toPayProduct: boolean): void {
    this.cartService.payProduct(id, toPayProduct);
  }
  public productsToPay(toPayProducts: boolean): void {
    this.cartService.payProducts(toPayProducts);
  }

  public confirmProductsToPay(): void {

    const products = this.cartProducts().map(cartProduct => (
      {
        id: cartProduct.id,
        quantity: cartProduct.quantity,
        subtotal: cartProduct.price * cartProduct.quantity,
      })
    );

    this.payload.set({
      products,
      total: this.summary().total,
      quantity: this.summary().quantity,
    });

  }

}
