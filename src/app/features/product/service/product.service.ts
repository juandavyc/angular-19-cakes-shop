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

  private fakeResponse = { "id": "ab9a50e5-1e9a-4ea5-9963-becc54642273", "name": "pastel de frutos rojos", "slug": "pastel-de-frutos-rojos", "cover": "http://localhost:4200/images/category-0.jpg", "description": "Rico pastel de bla bla", "price": 123440, "productCategories": [{ "productCategoryId": { "productId": "ab9a50e5-1e9a-4ea5-9963-becc54642273", "categoryId": 39 }, "category": { "id": 39, "name": "Mini postres", "slug": "mini-postres" } }, { "productCategoryId": { "productId": "ab9a50e5-1e9a-4ea5-9963-becc54642273", "categoryId": 33 }, "category": { "id": 33, "name": "Cupcakes", "slug": "cupcakes" } }], "productOccasions": [{ "productOccasionId": { "productId": "ab9a50e5-1e9a-4ea5-9963-becc54642273", "occasionId": 34 }, "occasion": { "id": 34, "name": "Halloween", "slug": "halloween" }, "createdAt": "2025-04-18T18:35:16.630933" }], "productImages": [{ "id": 21, "url": "http://localhost:4200/images/category-2.jpg", "altText": "alt-url-2", "createdAt": "2025-04-18T18:35:16.659261" }, { "id": 20, "url": "http://localhost:4200/images/category-1.jpg", "altText": "alt-url-1", "createdAt": "2025-04-18T18:35:16.634762" }], "user": { "id": 2, "username": "juandavyc", "email": "aaa@aaa.com" }, "createdAt": "2025-04-18T18:35:16.54979" };

  constructor() { }

  public getBySlug(slug: string): Observable<ProductResponse> {

    const url = `${this.baseUrl}/products/slug/${slug}`;
    console.log('request: ', url);
    return this.http.get<ProductResponse>(url).pipe(
      delay(1000),
      catchError(err => throwError(() => new Error(`An error ocurred: ${JSON.stringify(err)}`)))
    );
    // return of(this.fakeResponse).pipe(
    //   delay(2000)
    // );

  }

}
