import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CONFIG } from '@core/configs';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { ProductsResponse } from '../interfaces/products.response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() { }

  public searchProducts(params: Record<string, string>): Observable<ProductsResponse> {
    const endpoint = Object.keys(params).length > 0 ? 'api/products/search?' : 'api/products';
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get<ProductsResponse>(url, { params }).pipe(
      delay(2000),
      catchError(err => throwError(() => new Error(`An error ocurred: ${JSON.stringify(err)}`)))
    )
  }

  public delete(id: string): Observable<{ deleted: boolean }> {
    const url = `${this.apiUrl}/api/products/${id}`
    return this.http.delete(url, { observe: 'response' }).pipe(
      delay(2000),
      map(response => {
        if (response.status !== 204) throw new Error('Unexpected response status');
        return { deleted: true }
      }),
      catchError(err => throwError(() => {
        const message = err['message'] ?? JSON.stringify(err);
        return new Error(`An error ocurred: ${message}`)
      }))
    )
  }

  public emptyProducts(): Observable<ProductsResponse> {
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
