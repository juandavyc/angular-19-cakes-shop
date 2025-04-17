export interface PageInformation {
  page:          number;
  size:          number;
  totalPages:    number;
  totalElements: number;
  first:         boolean;
  last:          boolean;
  empty:         boolean;
}



export interface PaginationResponse{
  message:string,
  pagination:Pagination | null
}


export interface Pagination{
  page: number;
  total:number;
  next: number;
  previous:number;
  first:boolean;
  last: boolean;
}
