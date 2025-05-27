import { ChangeDetectionStrategy, Component, effect, inject, input, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CATEGORIES } from '@core/configs/products/categories.config';
import { Category } from '@core/interfaces';
import { CategoriesPayload, CategoriesResponse, ProductCategory } from '../../interfaces';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'categories-form',
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesFormComponent {

  public readonly categories = signal<Category[]>(
    CATEGORIES
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter(cat => cat.slug != 'todas-las-categorias')
  );

  public formPayload = signal<CategoriesPayload | null>(null);

  private service = inject(ProductService);

  public productCategories = input.required<ProductCategory[]>();
  public productId = input.required<string>();

  private fb = inject(FormBuilder);

  public form = this.fb.group({
    categories: this.fb.control<number[]>([], [Validators.required])
  });

  constructor() {
    effect(() => {
      const categories = this.productCategories().map(pcat => pcat.category.id);
      this.form.patchValue({
        categories
      })
    })
  }

  public categoriesRx = rxResource({
    request: () => ({ categories: this.formPayload() }),
    loader: ({request}):Observable<CategoriesResponse | null> => {
      if (!request.categories) return of(null);
      else return this.service.updateCategories(request.categories, this.productId())
    }
  })

  public onCategoryChange(id: number, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const selected = this.form.controls.categories.value ?? [];
    if (checkbox.checked) {
      this.form.controls.categories.setValue([id, ...selected])
    }
    else {
      this.form.controls.categories.setValue(selected.filter(category => category != id))
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formPayload.set(this.service.getCategoriesPayload(this.form.value.categories ?? []));
  }

}
