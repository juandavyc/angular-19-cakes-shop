import { ProductImage } from "./images.interface";

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  cover: string;
  categoryIds: number[];
  occasionIds: number[];
  productImages: ProductImage[];
  userId: number;
}

export interface ProductResponse {
  slug: string;
  id: string;
}
