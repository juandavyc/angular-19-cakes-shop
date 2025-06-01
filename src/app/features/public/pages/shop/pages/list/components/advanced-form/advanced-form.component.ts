import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { Category, Occasion } from '@core/interfaces';
import { CATEGORIES } from '@core/configs/products/categories.config';
import { OCCASIONS } from '@core/configs/products/occasions.config';
import { FormValidatorService } from '@core/services/form-validator.service';

@Component({
  selector: 'advanced-form',
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './advanced-form.component.html',
  styleUrl: './advanced-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedFormComponent {

  public form = input.required<FormGroup>();

  public readonly categories = signal<Category[]>(this.sortArray(CATEGORIES));
  public readonly occasions = signal<Occasion[]>(this.sortArray(OCCASIONS));

  private formValidatorService = inject(FormValidatorService);

  public isInvalidField(field: string): boolean | null {
    return this.formValidatorService.isInvalidControl(this.form().get(field));
  }
  public getErrorField(field: string): string | null {
    return this.formValidatorService.getErrorControl(this.form().get(field));
  }

  private sortArray(array: Category[] | Occasion[]): Category[] | Occasion[] {
    const first = array[0];
    const sorted = [...array].sort((a, b) => a.name.localeCompare(b.name))
      .filter(value => value != first);
    return [first,...sorted];
  }

}
