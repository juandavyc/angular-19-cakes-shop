
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
    //this.cart.set(this.loadFromLocalStorage())
    effect(() => {
      const cart = this.cart();
      this.saveToLocalStorage(cart);
    })
  }

  public getCarProducts(): CartProduct[] {
    return this.cart()
  }

  private loadFromLocalStorage(): CartProduct[] {
    if(!this.platformIdService.isBrowser()) return [];
    const stored = localStorage.getItem(this.CAR_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }



  private saveToLocalStorage(cart:CartProduct[]): void {
    if (this.platformIdService.isBrowser()) {
      localStorage.setItem(this.CAR_STORAGE_KEY, JSON.stringify(cart))
    }
  }


  public total = computed(() => this.cart().reduce((acc, pro) => acc + pro.price * pro.quantity, 0));


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

  public incrementQuantity(cartProduct: CartProduct): void {

    const existingProduct = this.cart()
      .find(product => product.id == cartProduct.id);

    if (existingProduct) {
      this.cart.update(products =>
        products.map(product => this.incrementQuantityProduct(product, existingProduct.id))
      )
    }

  }

  public decrementQuantity(cartProduct: CartProduct): void {

    const existingProduct = this.cart()
      .find(product => product.id == cartProduct.id);

    if (existingProduct) {
      this.cart.update(products =>
        products
          .map(product => this.decrementQuantityProduct(product, existingProduct.id))
          .filter(product => product.quantity > 0)
      )
    }

  }
  private incrementQuantityProduct(product: CartProduct, id: string): CartProduct {
    return product.id === id ? { ...product, quantity: product.quantity + 1 } : product
  }

  private decrementQuantityProduct(product: CartProduct, id: string): CartProduct {
    return product.id === id ? { ...product, quantity: product.quantity - 1 } : product
  }

  // constructor() {}

  // // Método para obtener todos los productos del carrito


  // // Método para añadir un producto al carrito
  // addToCart(product: Product): void {
  //   // Verificamos si el producto ya existe en el carrito
  //   const existingProduct = this.cart.find((p) => p.id === product.id);
  //   if (existingProduct) {
  //     // Si ya existe, aumentamos la cantidad
  //     existingProduct.quantity += product.quantity;
  //   } else {
  //     // Si no existe, lo añadimos al carrito
  //     this.cart.push(product);
  //   }
  // }

  // // Método para eliminar un producto del carrito
  // removeFromCart(productId: string): void {
  //   this.cart = this.cart.filter((product) => product.id !== productId);
  // }

  // // Método para vaciar el carrito
  // clearCart(): void {
  //   this.cart = [];
  // }

  // // Método para obtener el total del carrito
  // getTotal(): number {
  //   return this.cart.reduce((total, product) => total + product.price * product.quantity, 0);
  // }
}
