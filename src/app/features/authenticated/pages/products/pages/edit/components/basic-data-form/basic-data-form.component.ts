import { ChangeDetectionStrategy, Component, inject, input, signal, linkedSignal, effect, DestroyRef, OnDestroy, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ASSETS } from '@core/assets';
import { FormValidatorService } from '@core/services/form-validator.service';
import { BasicDataPayload, BasicDataResponse } from '../../interfaces';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter,  Observable, of } from 'rxjs';
import { ProductBasicData } from '../../interfaces/product-data.interface';
import { ProductService } from '../../services/product.service';
import { ImagesCdnComponent } from '@authenticated/pages/products/components/images-cdn/images-cdn.component';

@Component({
  selector: 'basic-data-form',
  imports: [
    ReactiveFormsModule,
    ImagesCdnComponent
  ],
  templateUrl: './basic-data-form.component.html',
  styleUrl: './basic-data-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDataFormComponent {

  private fb = inject(FormBuilder);
  private formValidatorService = inject(FormValidatorService);
  private service = inject(ProductService);

  public formPayload = signal<BasicDataPayload | null>(null);

  public productData = input.required<ProductBasicData>();
  public productId = input.required<string>();

  private destroyRef = inject(DestroyRef);

  private formEffect = effect(() => {
    const values = this.productData();
    this.form.patchValue(values);
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.formEffect.destroy()
    })
  }

  //

  public form = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    price: [0, [Validators.required, Validators.min(1000), Validators.max(1000000)]],
    cover: ['',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
        this.formValidatorService.isValidImage()
      ]
    ],
    description: ['', [Validators.maxLength(200)]],
  });


  public basicDataRx = rxResource({
    request: () => ({ form: this.formPayload() }),
    loader: ({ request }): Observable<BasicDataResponse | null> => {
      if (!request.form) return of(null);
      else return this.service.updateBasicData(request.form, this.productId());
    }
  })

  public coverImage = toSignal(
    this.form.controls.cover.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter(()=>this.form.controls.cover.valid),
    ),{initialValue: ASSETS.NO_IMAGE}
  )

  public isInvalidField(field: string): boolean | null {
    return this.formValidatorService.isInvalidField(this.form, field);
  }
  public getErrorField(field: string): string | null {
    return this.formValidatorService.getErrorField(this.form, field);
  }


  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formPayload.set(this.service.getBasicDataPayload(this.form.value))
  }

}
