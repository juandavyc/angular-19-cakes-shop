import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormValidatorService } from '@core/services/form-validator.service';

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

  // public pageSummary = input<string | null>();
  // private formFilterService = inject(FormFilterService);

  public form = input.required<FormGroup>();

  private formValidatorService = inject(FormValidatorService);

  public isInvalidField(): boolean | null {
    return this.formValidatorService.isInvalidControl(this.form().get('name'));
  }
  public getErrorField(): string | null {
    return this.formValidatorService.getErrorControl(this.form().get('name'));
  }

  // public get form() {
  //   return this.formFilterService.form
  // }

  // public search(value: string) {
  //   this.form.controls.name.setValue(value);
  // }
}
