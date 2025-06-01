import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal, viewChild } from '@angular/core';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

import { debounceTime, delay, distinctUntilChanged, filter, map, merge, Observable, of, startWith, take, tap } from 'rxjs';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BasicFormComponent } from './components/basic-form/basic-form.component';
import { AdvancedFormComponent } from './components/advanced-form/advanced-form.component';
import { BuildUrlsService } from './services/build-urls.service';
import { SHOP_CONFIG } from './configs/shop.config';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopResponse } from './interfaces';
import { ShopService } from './services/shop.service';
import { ProductsComponent } from './components/products/products.component';
import { PaginationResponse } from '@shared/interfaces';
import { PaginationService } from '@shared/service/pagination.service';
import { PlatformIdService } from '@shared/service/platform-id.service';
import { CONTACT_US } from '@core/configs/contact-us/contact-us.config';
import { SaveUrlService } from '@public/services/save-url.service';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-shop',
  imports: [
    ReactiveFormsModule,
    HeroTitleComponent,
    // components
    BasicFormComponent,
    AdvancedFormComponent,
    ProductsComponent,

    //pipes
    //JsonPipe,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {

  private seo = inject(SeoService);
  public readonly title = SHOP_CONFIG.title;
  public readonly subtitle = SHOP_CONFIG.subtitle;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  private shopService = inject(ShopService);
  private buildUrlService = inject(BuildUrlsService);
  private paginationService = inject(PaginationService);
  private platformIdService = inject(PlatformIdService);

  private saveUrlService = inject(SaveUrlService);

  constructor() {
    this.seo.setSeoMetadata(SHOP_CONFIG.seo);
  }

  public form = this.fb.group({
    name: ['',
      [Validators.minLength(2), Validators.maxLength(50)]
    ],
    minPrice: ['',
      [Validators.minLength(4), Validators.maxLength(7)] //digitsOnlyValidator()  occasion: 'todas-las-ocasiones',
    ],
    maxPrice: ['',
      [Validators.minLength(4), Validators.maxLength(7)] //digitsOnlyValidator()
    ],
    occasion: ['todas-las-ocasiones', Validators.required],
    category: ['todas-las-categorias', Validators.required],
    sort: ['created', Validators.required],
    size: ['9', Validators.required],
    page: ['0', Validators.required]
  });

  public payload = signal<Record<string, string> | null>(null);

  private httpParams = toSignal(
    this.activatedRoute.queryParams.pipe(
      distinctUntilChanged(),
      map(params => ({
        name: params['name'] ?? '',
        minPrice: this.buildUrlService.queryParamPrice(params['minPrice']),
        maxPrice: this.buildUrlService.queryParamPrice(params['maxPrice']),
        category: this.buildUrlService.queryParamCategory(params['category']),
        occasion: this.buildUrlService.queryParamOccasion(params['occasion']),
        sort: this.buildUrlService.queryParamSort(params['sort']),
        size: this.buildUrlService.queryParamSize(params['size']),
        page: this.buildUrlService.queryParamPage(params['page']),
      })),
      tap(params => {

        this.form.patchValue(params, { emitEvent: false });
        const queryParams = this.buildUrlService.cleanParams(params);

        const tree = this.router.createUrlTree([], {
          relativeTo: this.activatedRoute,
          queryParams
        });

        this.saveUrlService.setUrl(this.router.serializeUrl(tree));

        this.payload.set(queryParams)

      })
    )
  )
  private formSignal = toSignal(
    this.form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(() => this.form.valid),
      tap(params => {
        const queryParams = this.buildUrlService.cleanParams(params);
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams
        });
        this.payload.set(null);
      })
    )
  )

  public productPagination = linkedSignal({
    source: () => this.productListRx,
    computation: (source): PaginationResponse | null => {
      if (source.error()) return { message: 'Error', pagination: null };
      if (source.hasValue()) return this.paginationService.getPagination(source.value().pageInformation);
      return { message: 'Cargando...', pagination: null };
    }
  })

  public productListRx = rxResource({
    request: () => ({ payload: this.payload() }),
    loader: (params): Observable<ShopResponse> => {
      if (!params.request.payload) return this.shopService.emptyProducts();
      return this.shopService.searchProducts(params.request.payload);
    }
  })

  public resetFilters(): void {
    this.form.reset(this.buildUrlService.defaultValues(), { emitEvent: true });
  }

  public changePage(page: number): void {
    this.form.controls.page.setValue(page.toString());
  }


  public sendWhatsapp(slug: string) {
    if (!this.platformIdService.isBrowser) return;

    const url = location.origin + this.router.serializeUrl(
      this.router.createUrlTree(['/product', slug])
    );
    const encodedMessage = encodeURIComponent(`Hola, ¿Sigue estando disponible este artículo? - ${url}`);
    const waUrl = `https://wa.me/${CONTACT_US.number}?text=${encodedMessage}`;

    window.open(waUrl, '_blank');
  }

}
