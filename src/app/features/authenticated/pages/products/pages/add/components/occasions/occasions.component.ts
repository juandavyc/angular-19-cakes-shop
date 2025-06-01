import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { OCCASIONS } from '@core/configs/products/occasions.config';
import { Occasion } from '@core/interfaces';
import { FormValidatorService } from '@core/services/form-validator.service';
import { OccasionPayload } from '../../interfaces';

@Component({
  selector: 'occasions',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './occasions.component.html',
  styleUrl: './occasions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OccasionsComponent {

  public occasionsList: Occasion[] = OCCASIONS
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(category => category.slug != 'todas-las-ocasiones');

  constructor() {
    effect(() => {
      if (this.shouldResetForm()) {
        this.form.reset();
      }
    })
  }

  public shouldResetForm = input.required<boolean>();

  private fb = inject(FormBuilder);
  private formValidatorService = inject(FormValidatorService);

  public previousStep = output<void>();
  public occasionsPayload = output<OccasionPayload>();

  public form = this.fb.group({
    occasions: this.fb.array([], [Validators.required, this.minMaxItems()])
  })

  private get occasions(): FormArray {
    return this.form.controls.occasions as FormArray;
  }

  public onCheckboxChange(id: number, checked: boolean): void {
    if (!this.occasions.touched) this.occasions.markAsTouched();
    if (!checked) {
      const index = this.occasions.controls.findIndex((control) => control.value === id);
      if (index != -1) this.occasions.removeAt(index);
      return;
    }
    this.occasions.push(this.fb.control(id, Validators.required));
  }

  public isChecked(id: number): boolean {
    return this.occasions.controls.some(control => control.value === id);
  }

  public isInvalidArray(): boolean | null {
    return this.formValidatorService.isInvalidControl(this.occasions ?? null);
  }
  public getErrorArray(): string | null {
    return this.formValidatorService.getErrorControl(this.occasions ?? null)
  }

  public onSubmit(): void {
    if (this.form.invalid) return;
    const occasionIds: number[] = this.occasions.controls.map<number>(control => parseInt(control.value))
    this.occasionsPayload.emit({ occasionIds })
  }

  private minMaxItems(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormArray)) return null;
      const lengthItems = control.length;
      if (lengthItems < 1) return { minMaxLength: { min: 1, max: 4 } }
      if (lengthItems > 4) return { minMaxLength: { min: 1, max: 4 } }
      return null;
    }
  }

}
