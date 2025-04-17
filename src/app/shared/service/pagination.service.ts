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
    const pageText = page > 0 ? (`Pagina ${(page)} de ${totalPages},`) : '';
    return `${pageText} Mostrando ${totalElements} Resultado${totalElements > 1 ? 's' : ''} `;
  }



  public buildPagination(information: PageInformation): Pagination {
    return {
      page: (information.first) ? 0 : information.page +1,
      total: information.totalPages,
      next: (information.last) ? 0 : information.page + 1,
      previous: (information.first) ? 0 : information.page - 1,
      first: information.first,
      last: information.last,
    };
  }

  public getPagination(pageInformation: PageInformation): PaginationResponse {
    if (pageInformation.empty) {
      return {
        message: '',
        pagination: null
      };
    }
    return {
      message:  this.buildPageSummary(pageInformation),
      pagination:  this.buildPagination(pageInformation),
    }

  }

}
