import { ProductCategory, ProductOccasion } from "./product.response";

export interface BasicDataValues {
  name: string | null;
  price: number | null;
  cover: string | null;
  description: string | null;
}

export interface BasicDataPayload {
  name: string;
  price: number;
  cover: string;
  description: string;
  userId: number;
}

export interface BasicDataResponse {
  id:          string;
  name:        string;
  slug:        string;
  cover:       string;
  description: string;
  price:       number;
  createdAt:   string;
}


export interface CategoriesResponse {
  productCategories: ProductCategory[];
}

export interface OccasionsResponse {
  productOccasions: ProductOccasion[];
}
