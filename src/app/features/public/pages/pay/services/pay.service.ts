import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CONFIG } from '@core/configs';
import { CheckoutRequest } from '../interfaces/checkout-request.interface';
import { catchError, delay, map, of, throwError } from 'rxjs';
import { response } from 'express';
import { m } from 'node_modules/@angular/core/weak_ref.d-Bp6cSy-X';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() { }

  public create(payload: CheckoutRequest) {

    const url = `${this.apiUrl}/orders`
    return this.http.post(url, payload, { observe: 'response' }).pipe(
      delay(2000),
      map(response => {
        if (response.status === 201) {
          return response.headers.get('Location');
        }
        else {
          throw new Error('Unexpected response')
        }
      }),
      catchError(err => throwError(() => new Error(`An error ocurred ${JSON.stringify(err)}`)))
    )

  }

}


