import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormFilterService } from '../../services/form-filter.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'basic-form',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './basic-form.component.html',
  styleUrl: './basic-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFormComponent {

  public pageSummary = input<string | null>();

  private formFilterService = inject(FormFilterService);

  public isInvalidField(field: string): boolean | null {
    return this.formFilterService.isInvalidField(field);
  }
  public getErrorField(field: string): string | null {
    return this.formFilterService.getErrorField(field);
  }

  public get form() {
    return this.formFilterService.form
  }

  public search(value: string) {
    this.form.controls.title.setValue(value);
  }
}
