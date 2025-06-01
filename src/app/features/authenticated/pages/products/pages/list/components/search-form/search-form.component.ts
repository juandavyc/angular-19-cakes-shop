
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { CATEGORIES } from '@core/configs/products/categories.config';
import { OCCASIONS } from '@core/configs/products/occasions.config';
import { Category, Occasion } from '@core/interfaces';

@Component({
  selector: 'search-form',
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {

  public readonly categories = signal<Category[]>(this.sortArray(CATEGORIES));
  public readonly occasions = signal<Occasion[]>(this.sortArray(OCCASIONS));

  public form = input.required<FormGroup>();

  private sortArray(array: Category[] | Occasion[]): Category[] | Occasion[] {
    const first = array[0];
    const sorted = [...array].sort((a, b) => a.name.localeCompare(b.name))
      .filter(value=> value != first);
    return [...sorted];
  }

}
