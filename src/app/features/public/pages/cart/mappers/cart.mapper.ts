import { Product } from "../../shop/interfaces";
import { CartProduct } from "../interfaces";

export class CartMapper {

  static productToCartProduct(product: Product, quantity:number): CartProduct {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      cover: product.cover,
      price: product.price,
      quantity,
      pay:true,
    };
  }
}
