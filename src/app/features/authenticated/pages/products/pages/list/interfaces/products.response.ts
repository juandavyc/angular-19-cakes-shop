export interface ProductsResponse {
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

export interface PageInformation {
  page:          number;
  size:          number;
  totalPages:    number;
  totalElements: number;
  first:         boolean;
  last:          boolean;
  empty:         boolean;
}
