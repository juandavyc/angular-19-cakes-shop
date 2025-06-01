import { inject, Injectable } from '@angular/core';
import { CONFIG } from '@core/configs';
import { Contact } from '../interfaces/contact.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() {}

  create(value: Contact) {
    const url = `${this.apiUrl}/public/contact-us`
    return this.http.post(url, value, {observe: 'response'}).pipe(
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
