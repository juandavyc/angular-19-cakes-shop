
import { AfterViewInit, computed, effect, inject, Injectable, linkedSignal, PLATFORM_ID, signal } from '@angular/core';
import { CartProduct } from '../interfaces';
import { Product } from '../../shop/interfaces';
import { CartMapper } from '../mappers/cart.mapper';
import { isPlatformBrowser } from '@angular/common';
import { PlatformIdService } from '@shared/service/platform-id.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private CAR_STORAGE_KEY = 'cart_items';

  private platformIdService = inject(PlatformIdService);

  private cart = signal<CartProduct[]>(this.loadFromLocalStorage());

  constructor() {
    effect(() => {
      const cart = this.cart();
      this.saveToLocalStorage(cart);
    })
  }

  public getCarProducts(): CartProduct[] {
    return this.cart()
  }

  private loadFromLocalStorage(): CartProduct[] {
    if (!this.platformIdService.isBrowser()) return [];
    const stored = localStorage.getItem(this.CAR_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToLocalStorage(cart: CartProduct[]): void {
    if (this.platformIdService.isBrowser()) {
      localStorage.setItem(this.CAR_STORAGE_KEY, JSON.stringify(cart))
    }
  }

  public total = computed(() => this.cart().reduce((acc, pro) => acc + pro.price * pro.quantity, 0));

  public numberItems = computed(() => this.cart().length);


  public addProduct(product: Product) {

    const productMapped = CartMapper.productToCartProduct(product, 1);

    const existingProduct = this.cart()
      .find(prod => prod.id === productMapped.id);

    if (existingProduct) {
      this.cart.update(products =>
        products.map(product => this.incrementQuantityProduct(product, existingProduct.id))
      )
    }

    else {
      this.cart.update(prod => [...prod, productMapped]);
    }
  }

  public incrementQuantity(id: string): void {
    if (this.verifyId(id)) {
      this.cart.update(products =>
        products.map(product => this.incrementQuantityProduct(product, id))
      )
    }
  }

  public decrementQuantity(id: string): void {

    if (this.verifyId(id)) {
      this.cart.update(products =>
        products
          .map(product => this.decrementQuantityProduct(product, id))
          .filter(product => product.quantity > 0)
      )
    }
  }

  public removeProduct(id: string): void {
    if (this.verifyId(id)) {
      this.cart.update(products =>
        products.filter(product => product.id != id)
      )
    }
  }

  public payProduct(id: string, toPay:boolean): void {
    if (this.verifyId(id)) {
      this.cart.update(products =>
        products.map(product => product.id === id ? { ...product, pay: toPay } : product)
      )
    }
  }

  public payProducts(toPayProducts: boolean) {
    this.cart.update(products =>
      products.map(product => ({...product, pay:toPayProducts}))
    )
  }

  public removeToPayProducts() {
    this.cart.update(products =>
      products.filter(product => !product.pay)
    )
  }

  public removeAllProducts() {
    this.cart.set([]);
  }
  private verifyId(id: string): boolean {
    const existingProduct = this.cart()
      .find(product => product.id == id);
    return (existingProduct) ? true : false;
  }
  private incrementQuantityProduct(product: CartProduct, id: string): CartProduct {
    return product.id === id ? { ...product, quantity: product.quantity + 1 } : product
  }

  private decrementQuantityProduct(product: CartProduct, id: string): CartProduct {
    return product.id === id ? { ...product, quantity: product.quantity - 1 } : product
  }





}
