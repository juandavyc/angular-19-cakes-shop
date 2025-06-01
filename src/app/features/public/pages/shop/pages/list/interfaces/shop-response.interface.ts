import { PageInformation } from "@shared/interfaces";

export interface ShopResponse {
  content:         Product[];
  pageInformation: PageInformation;
}

export interface Product {
  id:          string;
  name:        string;
  slug:        string;
  cover:       string;
  description: string;
  price:       number;
  createdAt:   string;
}
