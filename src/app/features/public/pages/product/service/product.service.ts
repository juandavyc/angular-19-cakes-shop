import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CONFIG } from '@core/configs';
import { catchError, delay, Observable, of, throwError } from 'rxjs';
import { ProductResponse } from '../interfaces/product-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = CONFIG.API_BASE_URL;
  private http = inject(HttpClient);

  constructor() { }

  public getBySlug(slug: string): Observable<ProductResponse> {

    const url = `${this.baseUrl}/products/slug/${slug}`;
    console.log('request: ', url);
    return this.http.get<ProductResponse>(url).pipe(
      delay(1000),
      catchError(err => throwError(() => new Error(`An error ocurred: ${JSON.stringify(err)}`)))
    );

  }

}
