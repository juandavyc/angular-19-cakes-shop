import { Injectable } from '@angular/core';
import { OCCASIONS } from '@core/configs/products/occasions.config';
import { CATEGORIES } from '@core/configs/products/categories.config';
import { Category, Occasion } from '@core/interfaces';


interface ProductFormPartial {
  occasion: string | null;
  category: string | null;
  name: string | null;
  minPrice: string | null;
  maxPrice: string | null;
  sort: string | null;
  size: string | null;
  page: string | null;
}


@Injectable({
  providedIn: 'root'
})
export class BuildUrlsService {


  private readonly categories: Category[] = CATEGORIES;
  private readonly occasions: Occasion[] = OCCASIONS;

  private readonly defaultOccasion = 'todas-las-ocasiones';
  private readonly defaultCategories = 'todas-las-categorias';

  private readonly sorts: string[] = ['created', 'price,asc', 'price,desc'];
  private readonly sizes: string[] = ['9', '12', '15'];

  private readonly formDefault = new Map<string, string>([
    ["name", ""],
    ["minPrice", ""],
    ["maxPrice", ""],
    ["category", "todas-las-categorias"],
    ["occasion", "todas-las-ocasiones"],
    ["sort", "created"],
    ["size", "9"],
    ["page", "0"],
  ]);

  private sortBackend = new Map<string, string>([
    ["min-price", "price,asc"],
    ["max-price", "price,desc"]
  ]);


  constructor() { }

  public queryParamCategory(categoryParam: string | undefined): string {
    //console.log({ categoryParam });
    return this.getParamFromList(categoryParam, this.categories, this.defaultCategories);
  }

  public queryParamOccasion(occasionParam: string | undefined): string {
    //console.log({ occasionParam });
    return this.getParamFromList(occasionParam, this.occasions, this.defaultOccasion);
  }

  public queryParamSort(sortParam: string | undefined): string {
    return this.getParamFromArray(sortParam, this.sorts, this.sorts[0]);
  }

  public queryParamSize(sizeParam: string | undefined): string {
    return this.getParamFromArray(sizeParam, this.sizes, this.sizes[0]);
  }

  public queryParamPage(pageParam: string | undefined): string {
    if (!pageParam) return '0';
    return !isNaN(Number(pageParam)) ? pageParam : '0';
  }

  public queryParamPrice(priceParam: string | undefined): string {
    if (!priceParam) return '';
    return !isNaN(Number(priceParam)) ? priceParam : '';
  }

  public getParamFromList(param: string | undefined, list: Category[] | Occasion[], defaultParam: string): string {

    if (!param) {
    //  console.log({ defaultParam });
      return defaultParam;
    }
    else {
      const contentSlug = list.find(ls => ls.slug === param)
     // console.log({ contentSlug });
      if (contentSlug) {
      //  console.log('if ', contentSlug.slug);
        return contentSlug.slug;
      }
      else {
       // console.log('else ', defaultParam);
        return defaultParam;
      }
    }
  }

  public getParamFromArray(param: string | undefined, list: string[], defaultParam: string): string {
    if (!param) return defaultParam;
    const contentSlug = list.find(ls => ls === param)
    if (contentSlug) return contentSlug;
    else return defaultParam;
  }


  public cleanParams(source: Partial<ProductFormPartial>): any {
    const params: Record<string, string> = {};
    Object.entries(source).forEach(([key, value]) => {


      if (value !== '' && value !== this.formDefault.get(key)) {
        let currentValue = value!;
        // if (key == 'sort') params[key] = this.sortBackend.get(currentValue)!;
        // else params[key] = currentValue;
        params[key] = currentValue;
      }
    });
    return params;
  }

  public defaultValue(key: string): string {
    return this.formDefault.get(key)!;
  }

  public defaultValues() {
    return Object.fromEntries(this.formDefault);
  }

}
