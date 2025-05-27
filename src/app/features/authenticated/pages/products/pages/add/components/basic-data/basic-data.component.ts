import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImagesCdnComponent } from '@authenticated/pages/products/components/images-cdn/images-cdn.component';
import { FormValidatorService } from '@core/services/form-validator.service';
import { BasicDataPayload } from '../../interfaces';
import { ASSETS } from '@core/assets';

@Component({
  selector: 'basic-data',
  imports: [
    ReactiveFormsModule,
    ImagesCdnComponent,
  ],
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDataComponent {


  constructor(){
    effect(()=>{
      if(this.shouldResetForm()){
        this.form.reset();
      }
    })
  }

  public shouldResetForm = input.required<boolean>();

  public productName = input<string | null>();

  public previousStep = output<void>();
  public dataBasicPayload = output<BasicDataPayload>();

  private fb = inject(FormBuilder);
  private formValidatorService = inject(FormValidatorService);

  public form = this.fb.group({
    //name: this.fb.control(this.productName(), [Validators.required],),
    price: [,
      [Validators.required, Validators.min(1000), Validators.max(1000000)]
    ],
    cover: [,
      [Validators.required, Validators.minLength(3), Validators.maxLength(200), this.formValidatorService.isValidImage()]
    ],
    description: ['', [Validators.maxLength(200)]],
  });

  public isInvalidField(field: string) {
    return this.formValidatorService.isInvalidControl(this.form.get(field) ?? null);
  }

  public getErrorField(field: string) {
    return this.formValidatorService.getErrorControl(this.form.get(field) ?? null);
  }


  public get cover() {
    return this.form.get('cover') as FormControl;
  }

  public onSubmit():void {
    if (this.form.invalid) return;
    const name = this.productName();
    const { price, cover, description } = this.form.getRawValue();
    this.dataBasicPayload.emit({
      name: name ?? '',
      price: price ?? 0,
      cover: cover ?? ASSETS.NO_IMAGE,
      description: description ?? ''
    })
  }
}
