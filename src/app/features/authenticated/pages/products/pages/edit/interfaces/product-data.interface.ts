import { ProductCategory, ProductImage, ProductOccasion } from "./product.response";

export interface ProductData {
  id: string;
  basicData: ProductBasicData;
  categories: ProductCategory[];
  occasions: ProductOccasion[];
  images: ProductImage[];
}

export interface ProductBasicData {
  name: string;
  cover: string;
  description: string;
  price: number;
}



