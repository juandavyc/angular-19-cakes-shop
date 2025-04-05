import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { map, of, tap } from 'rxjs';


import { CONFIG } from '@core/configs';
import { FormKeys, QueryParamsKeys } from '../enums';
import { QueryParams } from '../interfaces/query-params.interfaces';




@Injectable({
  providedIn: 'root'
})
export class ShopService {


  readonly DEFAULTS = CONFIG.SHOP.DEFAULTS;
  readonly OCCASIONS = CONFIG.SHOP.OCCASIONS;
  readonly CATEGORIES = CONFIG.SHOP.CATEGORIES;

  // private router = inject(Router);
  // private activatedRoute = inject(ActivatedRoute);

  constructor() {

  }

  public getOccasionParam(param: ParamMap): string {
    return param.get('occasion') ?? this.DEFAULTS.occasion;
  }

  public getQueryParam(param: Params, key: QueryParamsKeys) {
    return param[key] ?? this.DEFAULTS[key];
  }

  public isValidOccasion(value: string): boolean {
    return this.OCCASIONS.includes(value);
  }


  buildPathParams(occasion: string | null | undefined): string[] {
    const occasionTrim = occasion?.trim();
    if (occasionTrim) {
      const isDefaultOccasion = occasionTrim === this.DEFAULTS.occasion;
      if (isDefaultOccasion) return ['/shop'];
      return ['/shop', occasionTrim]
    }
    return ['/shop'];
  }



  buildQueryParams(form: QueryParams) {
    const queryParams: Record<string, string> = {};

    // for(const field of form){
    //   console.log(field);
    // }

    Object.keys(form).forEach((key) => {
      const typedKey = key as keyof QueryParams;
      const value = form[typedKey];

      if (typeof value === 'string' && value.trim()) {
        if (value.trim() !== this.DEFAULTS[typedKey]) {
          queryParams[typedKey] = value.trim();
        }
      }
    });

    // if (form['title']?.trim()) queryParams['title'] = form['title'].trim();
    // if (form['minPrice']?.trim()) queryParams['min_price'] = form['minPrice'].trim();
    // if (form['maxPrice']?.trim()) queryParams['max_price'] = form['maxPrice'].trim();

    // if (form['category']?.trim() != this.CATEGORIES[0]) {
    //   if (form['category']?.trim()) queryParams['category'] = form['category'].trim();
    // }
    // if (form['sort']?.trim() != 'created') {
    //   if (form['sort']?.trim()) queryParams['sort'] = form['sort'].trim();
    // }
    // if (form['limit']?.trim() != '9') {
    //   if (form['limit']?.trim()) queryParams['limit'] = form['limit'].trim();
    // }

    return queryParams;
  }


  // http request
  getCakes(formData: any) {
    console.log("getCakes: ", formData);
    return of([]);
  }


}
