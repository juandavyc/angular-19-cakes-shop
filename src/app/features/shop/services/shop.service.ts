import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


import { ShopResponse } from '../interfaces';
import { catchError, delay, Observable, of, throwError } from 'rxjs';
import { CONFIG } from '@core/configs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseUrl = CONFIG.API_BASE_URL;
  private http = inject(HttpClient);

  private fakeResponse = {"content":[{"id":"ab9a50e5-1e9a-4ea5-9963-becc54642273","name":"pastel de frutos rojos","slug":"pastel-de-frutos-rojos","cover":"http://localhost:4200/images/category-0.jpg","description":"Rico pastel de bla bla","price":123440,"createdAt":"2025-04-18T18:35:16.54979"},{"id":"3e232449-9045-48df-b734-047457bdd868","name":"Torta delux","slug":"torta-delux","cover":"http://localhost:4200/images/category-1.jpg","description":"Rico pastel de bla bla","price":40000,"createdAt":"2025-04-18T18:36:38.186887"}],"pageInformation":{"page":0,"size":9,"totalPages":1,"totalElements":2,"first":true,"last":true,"empty":false}};

  constructor() { }

  getCakes(httpRequest: string): Observable<ShopResponse> {

    const url = this.baseUrl.concat('/products').concat(httpRequest.trim() === '' ? '' : ('/search?').concat(httpRequest));

    console.log("getRequest: ", url)

    return this.http.get<ShopResponse>(url).pipe(
      delay(1000),
      catchError(err => throwError(() => new Error(`An error ocurred: ${JSON.stringify(err)}`)))
    )

    return of(this.fakeResponse).pipe(
      delay(2000)
    );
    //return this.getEmptyShop();
  }

  getEmptyShop(): Observable<ShopResponse> {
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
