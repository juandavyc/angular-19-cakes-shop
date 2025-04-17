// los que van en la url
export interface QueryParams {
  title?: string | null | undefined;
  'min-price'?: string | null | undefined;
  'max-price'?: string | null | undefined;
  category?: string | null | undefined;
  sort?: string | null | undefined;
  size?: string | null | undefined;
  page?: string | null | undefined;
}
