export interface ProductResponse {
  id:                string;
  name:              string;
  slug:              string;
  cover:             string;
  description:       string;
  price:             number;
  productCategories: ProductCategory[];
  productOccasions:  ProductOccasion[];
  productImages:     ProductImage[];
  user:              User;
  createdAt:         string;
}

export interface ProductCategory {
  productCategoryId: ProductCategoryID;
  category:          Category;
}

export interface Category {
  id:   number;
  name: string;
  slug: string;
}

export interface ProductCategoryID {
  productId:  string;
  categoryId: number;
}

export interface ProductImage {
  id:        number;
  url:       string;
  altText:   string;
  createdAt: string;
}

export interface ProductOccasion {
  productOccasionId: ProductOccasionID;
  occasion:          Category;
  createdAt:         string;
}

export interface ProductOccasionID {
  productId:  string;
  occasionId: number;
}

export interface User {
  id:       number;
  username: string;
  email:    string;
}
