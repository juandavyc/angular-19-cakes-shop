import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { ImagesPayload, OccasionsPayload, OccasionsResponse, ProductResponse, Image, ProductData, ImagesResponse, BasicDataPayload, BasicDataResponse, CategoriesResponse, BasicDataValues, CategoriesPayload } from '../interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() { }

  public getBasicDataPayload(values: Partial<BasicDataValues>): BasicDataPayload {
    return {
      userId: 2,
      name: values.name ?? '',
      price: values.price ?? 0,
      cover: values.cover ?? '',
      description: values.description ?? ''
    }
  }

  public getOccasionsPayload(occasionIds: number[]): OccasionsPayload {
    return {
      userId: 2,
      occasionIds
    }
  }

  public getCategoriesPayload(categoryIds: number[]): CategoriesPayload {
    return {
      userId: 2,
      categoryIds
    }
  }

  public getImagesPayload(images: Image[]): ImagesPayload {
    return {
      userId: 2,
      images
    }
  }

  public getProductById(id: string): Observable<ProductData> {
    const url = `${this.apiUrl}/products/${id}`;
    return this.http.get<ProductResponse>(url)
      .pipe(
        delay(2000),
        map(this.toProductData),
        catchError((error) => {
          const message = error?.error?.message ?? JSON.stringify(error);
          return throwError(() => new Error(`An error ocurred: ${message}`))
        })
      );
  }

  public updateBasicData(payload: BasicDataPayload, id: string): Observable<BasicDataResponse> {
    const url = `${this.apiUrl}/products/${id}`;
    return this.http.put<BasicDataResponse>(url, payload)
      .pipe(
        delay(2000),
        catchError(err => throwError(() => new Error(`An error ocurred: ${JSON.stringify(err)}`)))
      );
  }

  public updateCategories(payload: CategoriesPayload, id: string): Observable<CategoriesResponse> {
    const url = `${this.apiUrl}/products/${id}/categories`;
    return this.http.put<CategoriesResponse>(url, payload)
      .pipe(
        delay(2000),
        catchError(err => throwError(() => new Error(`An error ocurred: ${JSON.stringify(err)}`)))
      );
  }

  public updateOccasions(payload: OccasionsPayload, id: string): Observable<OccasionsResponse> {
    const url = `${this.apiUrl}/products/${id}/occasions`;
    return this.http.put<OccasionsResponse>(url, payload)
      .pipe(
        delay(2000),
        catchError(err => throwError(() => new Error(`An error ocurred: ${JSON.stringify(err)}`)))
      );
  }

  public updateImages(payload: ImagesPayload, id: string): Observable<ImagesResponse> {
    const url = `${this.apiUrl}/products/${id}/images`;
    return this.http.put<ImagesResponse>(url, payload)
      .pipe(
        delay(2000),
        catchError(err => throwError(() => new Error(`An error ocurred: ${JSON.stringify(err)}`)))
      );
  }

  private toProductData(product: ProductResponse): ProductData {
    const { id, name, cover, description, price } = product;
    return {
      id,
      basicData: {
        name,
        cover,
        description,
        price
      },
      categories: product.productCategories,
      occasions: product.productOccasions,
      images: product.productImages,
    }
  }



}
