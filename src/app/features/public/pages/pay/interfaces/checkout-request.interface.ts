export interface CheckoutRequest {
  products: Product[];
  quantity: number;
  total:number;
}

export interface Product {
  id: string;
  quantity: number;
  subtotal: number;
}
