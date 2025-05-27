import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Image, ImagesPayload, ImagesResponse, ProductImage } from '../../interfaces';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatorService } from '@core/services/form-validator.service';

import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ImagesCdnComponent } from '@authenticated/pages/products/components/images-cdn/images-cdn.component';

@Component({
  selector: 'images-form',
  imports: [
    ImagesCdnComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './images-form.component.html',
  styleUrl: './images-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesFormComponent {

  public productImages = input.required<ProductImage[]>();
  public productId = input.required<string>();

  private fb = inject(FormBuilder);

  private formValidatorService = inject(FormValidatorService);
  private service = inject(ProductService);

  public formPayload = signal<ImagesPayload | null>(null);

  public form = this.fb.group({
    images: this.fb.array(
      [],
      [Validators.required]
    )
  })

  public newImage = this.fb.group({
    id: new FormControl<string | null>(null),
    url: new FormControl('', [Validators.required, this.formValidatorService.isValidImage()])
  });

  constructor() {
    effect(() => {
      const data = this.productImages();
      data.forEach(({ id, url, altText }) => {
        this.images.push(new FormGroup({
          id: new FormControl<number | null>(id, [Validators.required]),
          url: new FormControl(url, [Validators.required, this.formValidatorService.isValidImage()]),
          altText: new FormControl(altText, [Validators.required])
        }));
      })
    })
  }

  public imagesRx = rxResource({
    request: () => ({ images: this.formPayload() }),
    loader: ({request}):Observable<ImagesResponse | null> => {
      if (!request.images) return of(null);
      else return this.service.updateImages(request.images, this.productId())
    }
  })

  public addImage() {
    if (this.newImage.invalid) {
      return;
    }
    const { id, url } = this.newImage.value;

    this.images.push(new FormGroup({
      id: new FormControl<number | null>(null, [Validators.required]),
      url: new FormControl(url, [Validators.required, this.formValidatorService.isValidImage()]),
      altText: new FormControl(url, [Validators.required])
    }));

    this.newImage.reset();
  }

  public isInvalidFieldInArrayInGroup(index: number, field: string) {
    return this.formValidatorService.isInvalidFieldInArrayInGroup(this.images, index, field);
  }
  public getErrorFieldInArrayInGroup(index: number, field: string) {
    return this.formValidatorService.getErrorFieldInArrayInGroup(this.images, index, field);
  }

  public isInvalidImages(field: string): boolean | null {
    const control = this.form.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
  public getErrorImages(field: string): string | null {
    return this.formValidatorService.getError(this.form.get(field));
  }

  public isInvalidField(field: string): boolean | null {
    return this.formValidatorService.isInvalidField(this.newImage, field);
  }

  public getErrorField(field: string): string | null {
    return this.formValidatorService.getErrorField(this.newImage, field);
  }

  public removeImage(index: number) {
    this.form.controls.images.removeAt(index);
  }

  public get images(): FormArray {
    return this.form.controls.images as FormArray;
  }

  public onSubmit(): void {
    const images:Image[] = this.form.value.images as Image[];
    this.formPayload.set(this.service.getImagesPayload(images ?? []));
  }

}
