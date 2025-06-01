import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CONFIG } from '@core/configs';
import { catchError, delay, Observable, of, throwError } from 'rxjs';
import { ProductResponse } from '../interfaces/product-response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() { }

  public getBySlug(slug: string): Observable<ProductResponse> {
    const url = `${this.apiUrl}/public/products/slug/${slug}`;
    return this.http.get<ProductResponse>(url).pipe(
      delay(1000),
      catchError(err => throwError(() => new Error(`An error ocurred: ${JSON.stringify(err)}`)))
    );

  }

}
