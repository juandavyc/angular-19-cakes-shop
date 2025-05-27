export interface ImagesPayload {
  images: Image[];
  userId: number;
}

export interface ImagesResponse {
  productImages: Image[];
}

export interface Image {
  id:      number | null;
  url:     string;
  altText: string;
}





