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


  constructor() { }

  getCakes(httpRequest: string): Observable<ShopResponse> {

    const url = this.baseUrl.concat('/products').concat(httpRequest.trim() === '' ? '' : ('/search?').concat(httpRequest));

    console.log("getRequest: ", url)

    return this.http.get<ShopResponse>(url).pipe(
      delay(1000),
      catchError(err => throwError(() => new Error(`An error ocurred: ${JSON.stringify(err)}`)))
    )

    // return of(this.fakeResponse).pipe(
    //   delay(2000)
    // );
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
