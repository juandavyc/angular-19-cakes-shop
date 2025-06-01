import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ShopResponse } from '../interfaces';
import { catchError, delay, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private apiUrl = `${environment.apiUrl}/public`;
  private http = inject(HttpClient);
  private productsCache = new Map<string, ShopResponse>();


  constructor() { }

  public searchProducts(params: Record<string, string>): Observable<ShopResponse> {
    const endpoint = Object.keys(params).length > 0 ? 'products/search?' : 'products';
    const paramsStringify = JSON.stringify(params);

    if(this.productsCache.has(paramsStringify)){
      return of(this.productsCache.get(paramsStringify)!);
    }
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get<ShopResponse>(url, { params }).pipe(
      delay(2000),
      // tap(products =>{
      //   this.productsCache.set(paramsStringify, products)
      // }),
      catchError(err => throwError(() => new Error(`An error ocurred: ${JSON.stringify(err)}`)))
    )
  }
  emptyProducts(): Observable<ShopResponse> {
    return of({
      content: [],
      pageInformation: {
        page: 0,
        size: 0,
        totalPages: 0,
        totalElements: 0,
        first: false,
        last: false,
        empty: true,
      }
    })
  }

}
