import { Injectable } from '@angular/core';
import { ParamMap, Params } from '@angular/router';
import { CONFIG } from '@core/configs';
import { QueryParamsKeys } from '../enums';
import { QueryParams } from '../interfaces';
import { OCCASIONS } from '@core/configs/products/occasions.config';
import { CATEGORIES } from '@core/configs/products/categories.config';


@Injectable({
  providedIn: 'root'
})
export class BuildUrlsService {

  private readonly DEFAULTS = CONFIG.SHOP.DEFAULTS;
  private readonly OCCASIONS = OCCASIONS;
  private readonly CATEGORIES = CATEGORIES;

  private sortBackend = new Map<string, string>([
    ["min-price", "price,asc"],
    ["max-price", "price,desc"]
  ])


  private frontMap = new Map<string, string>([
    ["maxPrice", "max-price"],
    ["minPrice", "min-price"],
  ])

  constructor() {
  }

  public getOccasionParam(param: ParamMap): string {
    return param.get('occasion') ?? this.DEFAULTS.url.occasion;
  }

  // las que vienen del URL
  public getQueryParam(param: Params, key: QueryParamsKeys) {
    return param[key] ?? this.DEFAULTS.url[key];
  }

  public isValidOccasion(value: string): boolean {
    return this.OCCASIONS.some(occasion => occasion.slug === value);
  }

  buildPathParams(occasion: string | null | undefined): string[] {
    const occasionTrim = occasion?.trim();
    if (occasionTrim) {
      const isDefaultOccasion = occasionTrim === this.DEFAULTS.url.occasion;
      if (isDefaultOccasion) return ['/shop'];
      return ['/shop', occasionTrim]
    }
    return ['/shop'];
  }

  buildQueryParams(form: QueryParams) {
    const queryParams: Record<string, string> = {};

    Object.keys(form).forEach((key) => {

      const typedKey = key as keyof QueryParams;
      const value = form[typedKey];
      if (typeof value === 'string' && value.trim()) {
        if (value.trim() !== this.DEFAULTS.url[typedKey]) {
          queryParams[this.frontMap.get(key) ?? typedKey] = value.trim();
        }
      }
    });

    return queryParams;
  }

  buildQueryBackend(pathParams: string[], queryParams: Record<string, string>) {

    if (pathParams.length > 1 && pathParams[1]) {
      queryParams['occasion'] = pathParams[1];
    }

    Object.entries(queryParams).forEach(([key, value]) => {
      queryParams[key] = this.sortBackend.get(queryParams[key]) ?? value;
    });
    return (new URLSearchParams(queryParams).toString());
  }
}
