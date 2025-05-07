import { inject, Injectable } from '@angular/core';
import { CONFIG } from '@core/configs';
import { Contact } from '../interfaces/contact.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  private apiUrl = `${CONFIG.API_BASE_URL}/contact-us`;
  private http = inject(HttpClient);

  constructor() {}

  create(value: Contact) {

    return this.http.post(this.apiUrl, value, {observe: 'response'}).pipe(
      delay(2000),
      map(response=>{
        if(response.status === 204){
          return 'El mensaje fue enviado';
        }
        throw new Error('Unexpected response');
      }),
      catchError(err => throwError(() => new Error(`An error ocurred: ${JSON.stringify(err)}`)))
    );

  }


}
