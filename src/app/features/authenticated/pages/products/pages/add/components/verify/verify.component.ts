import { ChangeDetectionStrategy, Component, effect, Inject, inject, input, output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormValidatorService } from '@core/services/form-validator.service';
import { map, Observable, switchMap, timer } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'verify',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyComponent {


  constructor() {
    effect(() => {
      const reset = this.shouldResetForm();
      if (reset) {
        this.name.reset();
      }
    })
  }

  public shouldResetForm = input.required<boolean>();

  private fb = inject(FormBuilder);


  private formValidatorService = inject(FormValidatorService);
  private verifyService = inject(ProductService);

  public productName = output<string>();

  public name = this.fb.control<string>(
    '',
    [
      Validators.required,
      Validators.minLength(2)
    ],
    [
      this.availableByName()
    ]
  );

  public isInvalidControl() {
    return this.formValidatorService.isInvalidControl(this.name);
  }

  public getErrorControl() {
    return this.formValidatorService.getErrorControl(this.name);
  }

  private availableByName(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ isTaken: boolean; } | null> => {
      return timer(500).pipe(
        switchMap(() => (
          this.verifyService.availableByName(control.value).pipe(
            map(isAvailable => isAvailable ? null : { isTaken: true })
          )
        ))
      )
    }
  }

  public emmitName() {
    const productName = this.name.value?.trim();
    if (!this.name.valid) return;
    if (!productName) return;
    this.productName.emit(productName);
  }

}
