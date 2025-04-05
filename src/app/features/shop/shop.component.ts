import { ChangeDetectionStrategy, Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormValidatorService } from '@core/services/form-validator.service';
import { digitsOnlyValidator } from '@core/validators/digits-only.validator';
import { TitleCasePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter, map, of, startWith, tap } from 'rxjs';
import { ShopService } from './services/shop.service';
import { CONFIG } from '@core/configs';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamsKeys } from './enums';


// interface FormData{

//   title: string | null;
//   minPrice: string | null;
//   maxPrice: string | null;
//   category: string | null;
//   ocassions: string | null;

// }
@Component({
  selector: 'app-shop',
  imports: [
    HeroTitleComponent,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {

  title = 'Tienda';
  subtitle = '"La felicidad tiene sabor a pastel recién horneado"';

  readonly OCCASIONS = CONFIG.SHOP.OCCASIONS;
  readonly CATEGORIES = CONFIG.SHOP.CATEGORIES;

  private fb = inject(FormBuilder);

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private shopService = inject(ShopService);
  private formValidatorService = inject(FormValidatorService);

  public myForm = this.fb.group({
    title: ['',
      [Validators.minLength(2), Validators.maxLength(50)]
    ],
    minPrice: ['',
      [Validators.minLength(4), Validators.maxLength(7), digitsOnlyValidator()]
    ],
    maxPrice: ['',
      [Validators.minLength(4), Validators.maxLength(7), digitsOnlyValidator()]
    ],
    category: [this.CATEGORIES[0], Validators.required],
    occasion: [this.OCCASIONS[0], Validators.required],
    sort: ['created', Validators.required],
    limit: ['9', Validators.required]
  });


  private httpPathParams = toSignal(
    this.activatedRoute.paramMap.pipe(
      map(params => this.shopService.getOccasionParam(params)),
      tap((occasion) => {
        if (!this.shopService.isValidOccasion(occasion)) {
          this.router.navigate(['/shop']);
        }
      }),
      tap((occasion) => {
        this.myForm.patchValue({
          occasion
        }, { emitEvent: false })
      })
    )
  )

  private httpQueryParams = toSignal(
    this.activatedRoute.queryParams.pipe(
      map(params => ({
        title: this.shopService.getQueryParam(params, QueryParamsKeys.TITLE),
        minPrice: this.shopService.getQueryParam(params, QueryParamsKeys.MIN_PRICE),
        maxPrice: this.shopService.getQueryParam(params, QueryParamsKeys.MAX_PRICE),
        category: this.shopService.getQueryParam(params, QueryParamsKeys.CATEGORY),
        sort: this.shopService.getQueryParam(params, QueryParamsKeys.SORT),
        limit: this.shopService.getQueryParam(params, QueryParamsKeys.LIMIT),
      })),
      tap(params => {
        if (this.myForm.invalid) {
          this.router.navigate(['/shop']);
        }
        else {
          this.myForm.patchValue({
            ...params
          }, { emitEvent: false })
        }
      })
    )
  )

  isInvalidField(field: string): boolean | null {
    return this.formValidatorService.isInvalidField(this.myForm, field);
  }
  getErrorField(field: string): string | null {
    return this.formValidatorService.getErrorField(this.myForm, field);
  }

  private myFormSignal = toSignal(
    this.myForm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        startWith(this.myForm.value),
        filter(() => this.myForm.valid),

      )
  )

  cakesRxResource = rxResource({
    request: () => ({ form: this.myFormSignal() }),
    loader: ({ request }) => {
      if (request.form) {

        const {occasion, ...requestForm} = request.form;

        const pathParams = this.shopService.buildPathParams(occasion);

        const queryParams = this.shopService.buildQueryParams(requestForm);
        this.router.navigate(pathParams, {
          queryParams,
        });
        return this.shopService.getCakes(request.form);
      }
      return of([]);
    }
  })

}
