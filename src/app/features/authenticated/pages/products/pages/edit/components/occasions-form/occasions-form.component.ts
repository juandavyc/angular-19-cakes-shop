import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { OccasionsPayload, OccasionsResponse, ProductOccasion } from '../../interfaces';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OCCASIONS } from '@core/configs/products/occasions.config';
import { Occasion } from '@core/interfaces';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'occasions-form',
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './occasions-form.component.html',
  styleUrl: './occasions-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OccasionsFormComponent {

  public readonly occasions = signal<Occasion[]>(
    OCCASIONS.sort((a, b) => a.name.localeCompare(b.name))
      .filter(occasion => occasion.slug != 'todas-las-ocasiones')
  );

  public productOccasions = input.required<ProductOccasion[]>();
  public productId = input.required<string>();

  public formPayload = signal<OccasionsPayload | null>(null);
  private service = inject(ProductService);

  private fb = inject(FormBuilder);

  public form = this.fb.group({
    occasions: this.fb.control<number[]>([], [Validators.required])
  })

  constructor() {
    effect(() => {
      const occasions: number[] = this.productOccasions().map(oc => oc.occasion.id);
      this.form.patchValue({ occasions });
    })
  }

  public occasionsRx = rxResource({
    request: () => ({ occasions: this.formPayload() }),
    loader: ({ request }): Observable<OccasionsResponse | null> => {
      if (!request.occasions) return of(null)
      else return this.service.updateOccasions(request.occasions, this.productId())
    }
  })

  public onCategoryChange(id: number, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const selected = this.form.controls.occasions.value ?? [];
    if (checkbox.checked) {
      this.form.controls.occasions.setValue([id, ...selected])
    }
    else {
      this.form.controls.occasions.setValue(selected.filter(occasion => occasion != id));
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formPayload.set(this.service.getOccasionsPayload(this.form.value.occasions ?? []));
  }

}
