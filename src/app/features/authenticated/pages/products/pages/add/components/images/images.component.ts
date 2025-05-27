import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ImagesCdnComponent } from '@authenticated/pages/products/components/images-cdn/images-cdn.component';
import { FormValidatorService } from '@core/services/form-validator.service';
import { ImagesPayload, ProductImage } from '../../interfaces';


@Component({
  selector: 'images',
  imports: [
    ReactiveFormsModule,
    ImagesCdnComponent,
  ],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesComponent {

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
  public imagesPayload = output<ImagesPayload>();

  public form = this.fb.group({
    images: this.fb.array([], [this.minMaxItems()])
  })

  public newImage = this.fb.control<string | null>(null, [Validators.required, this.formValidatorService.isValidImage()]);

  public get images(): FormArray {
    return this.form.controls.images as FormArray;
  }

  public addImage(): void {
    if (this.newImage.invalid) return;
    if (this.images.untouched) this.images.markAsTouched();
    const image = this.newImage.value ?? '';
    this.images.push(this.fb.control(image, [Validators.required, this.formValidatorService.isValidImage()]));
    this.newImage.reset();
  }

  public removeImage(index: number): void {
    this.images.removeAt(index);
  }

  public isInvalidNewImage(): boolean {
    const xxx = this.formValidatorService.isInvalidControl(this.newImage);
    return this.formValidatorService.isInvalidControl(this.newImage)
  }

  public getErrorNewImage(): string | null {
    return this.formValidatorService.getErrorControl(this.newImage)
  }

  public isInvalidImageInArray(index: number): boolean {
    return this.formValidatorService.isInvalidControl(this.images.at(index));
  }

  public getErrorImageInArray(index: number): string | null {
    return this.formValidatorService.getErrorControl(this.images.at(index))
  }


  public onSubmit(): void {
    if (this.form.invalid) return;
    const productImages: ProductImage[] = this.images.controls
      .map<ProductImage>(control => ({
        url: control.value,
        altText: control.value
      }))
    this.imagesPayload.emit({ productImages });

  }
  private minMaxItems(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormArray)) return null;
      const lengthItems = control.length;
      if (lengthItems < 1) return { minMaxLength: { min: 1, max: 4 } }
      if (lengthItems > 8) return { minMaxLength: { min: 1, max: 8 } }
      return null;
    }
  }


}
