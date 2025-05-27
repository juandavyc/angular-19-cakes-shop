import { inject, Injectable } from '@angular/core';
import { BasicDataPayload, CategoriesPayload, OccasionPayload, ImagesPayload } from '../interfaces';
import { ProductPayload, ProductResponse } from '../interfaces/product.interface';
import { catchError, delay,  map, Observable, throwError } from 'rxjs';
import { CONFIG } from '@core/configs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  public getPayload(basicData: BasicDataPayload | null,
    categoryIds: CategoriesPayload | null,
    occasionIds: OccasionPayload | null,
    productImages: ImagesPayload | null): ProductPayload | null {
    if (!basicData || !categoryIds || !occasionIds || !productImages) return null;

    return {
      ...basicData,
      ...categoryIds,
      ...occasionIds,
      ...productImages,
      userId: 2,
    }
  }

  constructor() { }


  public availableByName(name: string): Observable<boolean> {
    const url = `${this.apiUrl}/products/available`;
    return this.http.get<boolean>(url, {params:{name}}).pipe(
      delay(2000),
      catchError((error)=> throwError(()=>new Error(`An error ocurred`)))
    );
  }

  public create(payload: ProductPayload): Observable<ProductResponse> {

    const url = `${this.apiUrl}/products`;
    return this.http.post<ProductResponse>(url, payload, { observe: 'response' }).pipe(
      delay(2000),
      map((response) => {
        if (response.status !== 201) throw new Error('Unexpected response');
        const product = response.body;
        if (!product) throw new Error('Unexpected body response');
        return {
          slug: product.slug,
          id: product.id
        }
      }),
      catchError(err => throwError(() => {
        const message = err['message'] ?? JSON.stringify(err);
        return new Error(`An error ocurred: ${message}`)
      }))

    )
  }



}
