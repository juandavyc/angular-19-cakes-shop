import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CATEGORIES } from '@core/configs/products/categories.config';
import { Category } from '@core/interfaces';
import { FormValidatorService } from '@core/services/form-validator.service';
import { CategoriesPayload } from '../../interfaces';

@Component({
  selector: 'categories',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {

  public categoriesList: Category[] = [...CATEGORIES]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(category => category.slug != 'todas-las-categorias');

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
  public categoriesPayload = output<CategoriesPayload>();

  public form = this.fb.group({
    categories: this.fb.array([], [Validators.required, this.minMaxItems()])
  })

  private get categories(): FormArray {
    return this.form.controls.categories as FormArray;
  }

  public onCheckboxChange(id: number, checked: boolean): void {
    if (!this.categories.touched) this.categories.markAsTouched();
    if (!checked) {
      const index = this.categories.controls.findIndex((control) => control.value === id);
      if (index != -1) this.categories.removeAt(index);
      return;
    }
    this.categories.push(this.fb.control(id, Validators.required));
  }

  public isChecked(id: number): boolean {
    return this.categories.controls.some(control => control.value === id);
  }

  public isInvalidArray(): boolean | null {
    return this.formValidatorService.isInvalidControl(this.categories ?? null);
  }
  public getErrorArray(): string | null {
    return this.formValidatorService.getErrorControl(this.categories ?? null)
  }

  public onSubmit(): void {
    if (this.form.invalid) return;
    const categoryIds: number[] = this.categories.controls.map<number>(control => parseInt(control.value))
    this.categoriesPayload.emit({ categoryIds })
  }

  private minMaxItems(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormArray)) return null;
      const lengthItems = control.length;
      if (lengthItems < 2) return { minMaxLength: { min: 2, max: 4 } }
      if (lengthItems > 4) return { minMaxLength: { min: 2, max: 4 } }
      return null;
    }
  }

}
