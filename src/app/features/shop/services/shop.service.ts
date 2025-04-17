import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


import { ShopResponse } from '../interfaces';
import { catchError, delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseUrl = 'http://localhost:8081/api/products';
  private http = inject(HttpClient);

  private fakeResponse = {
    "content": [
      {
        "id": "09f39964-185a-4ddb-ac88-27b7fbf560b2",
        "name": "Pastel de frutos rojos ocacional",
        "slug": "pastel-de-frutos-rojos-ocacional",
        "cover": "https://images.unsplash.com/photo-1744278955687-2a0216448268?w=500",
        "description": "Muito bom para comer",
        "price": 20000,
        "createdAt": "2025-04-11T21:57:50.792736"
      },
      {
        "id": "83e1c4bd-ce17-48c7-a1d8-646ec1cd875f",
        "name": "Pastel de aniversario 30 años para 6 personas",
        "slug": "pastel-de-aniversario-30-anos-para-6-personas",
        "cover": "https://images.unsplash.com/photo-1744473671695-d00cfb151579?w=500",
        "description": "Muito bom para comer",
        "price": 458983,
        "createdAt": "2025-04-13T15:39:05.519533"
      },
      {
        "id": "e8b43f3a-97dd-463a-b0ee-337fc63807c9",
        "name": "Pastel para 2",
        "slug": "pastel-para-2",
        "cover": "https://images.unsplash.com/photo-1744278955687-2a0216448268?w=500",
        "description": "Muito bom para comer",
        "price": 40000,
        "createdAt": "2025-04-11T20:06:59.353766"
      },
      {
        "id": "55f9e9da-46d4-4e6c-8a90-a7e5227aeff4",
        "name": "Torta 3 leches Gync de arandanos chocolate frutos verdes frutos rojos sandia limon queso",
        "slug": "torta-3-leches-gync-de-arandanos",
        "cover": "https://images.unsplash.com/photo-1744473671695-d00cfb151579?w=500",
        "description": "Muito bom para comer",
        "price": 35000,
        "createdAt": "2025-04-11T21:51:21.199275"
      }
    ],
    "pageInformation": {
      "page": 0,
      "size": 9,
      "totalPages": 1,
      "totalElements": 4,
      "first": true,
      "last": true,
      "empty": false
    }
  };
  constructor() { }

  getCakes(httpRequest: string): Observable<ShopResponse> {

    const url = this.baseUrl.concat(httpRequest.trim() === "" ? '' : ('/search?').concat(httpRequest));
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
