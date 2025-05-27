import { Injectable } from '@angular/core';
import { PageInformation, Pagination, PaginationResponse } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})


export class PaginationService {

  constructor() {

  }

  private buildPageSummary(pageInformation: PageInformation): string {
    const { page, totalPages, totalElements } = pageInformation;
    const pageText = page > 0 ? (`Pagina ${(page)} de ${totalPages-1},`) : 'Pagina principal, ';
    return `${pageText} Mostrando ${totalElements} Resultado${totalElements > 1 ? 's' : ''} `;
  }



  private buildPagination(information: PageInformation): Pagination {
    return {
      page: (information.first) ? 0 : information.page,
      total: information.totalPages,
      next: (information.last) ? 0 : information.page + 1,
      previous: (information.first) ? 0 : information.page - 1,
      first: information.first,
      last: information.last,
    };
  }

  public emptyPagination(){
    return {
      message: '',
      pagination: null
    };
  }

  public getPagination(pageInformation: PageInformation): PaginationResponse {
    if (pageInformation.empty) {
     this.emptyPagination();
    }
    return {
      message:  this.buildPageSummary(pageInformation),
      pagination:  this.buildPagination(pageInformation),
    }
  }


}
