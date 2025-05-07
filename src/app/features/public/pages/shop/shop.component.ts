import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

import { debounceTime, distinctUntilChanged, filter, map, Observable, of, startWith, tap } from 'rxjs';
import { ShopService } from './services/shop.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormFilterService } from './services/form-filter.service';
import { BasicFormComponent } from './components/basic-form/basic-form.component';
import { AdvancedFormComponent } from './components/advanced-form/advanced-form.component';
import { BuildUrlsService } from './services/build-urls.service';
import { QueryParamsKeys } from './enums';
import { PaginationService } from '@shared/service/pagination.service';
import { Product, ShopResponse } from './interfaces';
import { PaginationResponse } from '@shared/interfaces';
import { ProductsComponent } from './components/products/products.component';
import { SHOP_CONFIG } from './configs/shop.config';

@Component({
  selector: 'app-shop',
  imports: [
    HeroTitleComponent,
    // components
    BasicFormComponent,
    AdvancedFormComponent,
    ProductsComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {

  public readonly title = SHOP_CONFIG.title;
  public readonly subtitle = SHOP_CONFIG.subtitle;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private shopService = inject(ShopService);
  private formFilterService = inject(FormFilterService);
  private buildUrlsService = inject(BuildUrlsService);


  private paginationService = inject(PaginationService);

  private httpPathParams = toSignal(
    this.activatedRoute.paramMap.pipe(
      map(params => this.buildUrlsService.getOccasionParam(params)),
      tap((occasion) => {
        if (!this.buildUrlsService.isValidOccasion(occasion)) {
          this.router.navigate(['/shop']);
        }
      }),
      tap((occasion) => {
        this.formFilterService.form.patchValue({
          occasion
        }, { emitEvent: false })
      })
    )
  )

  private httpQueryParams = toSignal(
    this.activatedRoute.queryParams.pipe(
      map(params => ({
        title: this.buildUrlsService.getQueryParam(params, QueryParamsKeys.TITLE),
        minPrice: this.buildUrlsService.getQueryParam(params, QueryParamsKeys.MIN_PRICE),
        maxPrice: this.buildUrlsService.getQueryParam(params, QueryParamsKeys.MAX_PRICE),
        category: this.buildUrlsService.getQueryParam(params, QueryParamsKeys.CATEGORY),
        sort: this.getSortPage(this.buildUrlsService.getQueryParam(params, QueryParamsKeys.SORT)),
        size: this.getSizePage(this.buildUrlsService.getQueryParam(params, QueryParamsKeys.SIZE)),
        page: this.buildUrlsService.getQueryParam(params, QueryParamsKeys.PAGE),
      })),
      tap(params => {
        if (this.formFilterService.form.invalid) {
          this.router.navigate(['/shop']);
        }
        else {
          this.formFilterService.form.patchValue({
            ...params
          }, { emitEvent: false })
        }
      })
    )
  )

  private myFormSignal = toSignal(
    this.formFilterService.form.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        startWith(this.formFilterService.form.value),
        filter(() => this.formFilterService.form.valid),
      )
  )

  public shopPagination = linkedSignal({
    source: () => this.shopRxResource,
    computation: (source): PaginationResponse | null => {
      if (source.error()) return { message: 'Error', pagination: null };
      if (source.hasValue()) return this.paginationService.getPagination(source.value().pageInformation);
      return { message: 'Cargando...', pagination: null };
    }
  })


  public shopRxResource = rxResource({
    request: () => ({ form: this.myFormSignal() }),
    loader: (params): Observable<ShopResponse> => {

      const { request } = params;
      if (request.form) {
        const { occasion, ...requestForm } = request.form;
        const pathParams = this.buildUrlsService.buildPathParams(occasion);
        const queryParams = this.buildUrlsService.buildQueryParams(requestForm);
        const httpRequest = this.buildUrlsService.buildQueryBackend([...pathParams], { ...queryParams });
        this.router.navigate(pathParams, {
          queryParams,
        });

        return this.shopService.getCakes(httpRequest);
      }
      else {
        return this.shopService.getEmptyShop();
      }
    }
  })

  public getSizePage(size: string): string {
    return this.buildUrlsService.getSizePage(size);
  }

  public getSortPage(sort: string):string{
    return this.buildUrlsService.getSortPage(sort);
  }
}
