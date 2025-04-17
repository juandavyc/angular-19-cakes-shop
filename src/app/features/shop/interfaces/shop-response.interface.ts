import { PageInformation } from "@shared/interfaces";

export interface ShopResponse {
  content:         Content[];
  pageInformation: PageInformation;
}

export interface Content {
  id:          string;
  name:        string;
  slug:        string;
  cover:       string;
  description: string;
  price:       number;
  createdAt:   Date;
}
