import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormFilterService } from '../../services/form-filter.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

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

  private formFilterService = inject(FormFilterService);

  public isInvalidField(field: string): boolean | null {
    return this.formFilterService.isInvalidField(field);
  }

  public getErrorField(field: string): string | null {
    return this.formFilterService.getErrorField(field);
  }

  public get form() {
    return this.formFilterService.form;
  }

  public get Occasions() {
    return this.formFilterService.Occasions;
  }

  public get Cateogries() {
    return this.formFilterService.Categories;
  }

}
