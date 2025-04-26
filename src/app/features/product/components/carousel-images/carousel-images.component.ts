import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ProductImage } from '../../interfaces/product-response.interface';

@Component({
  selector: 'carousel-images',
  imports: [],
  templateUrl: './carousel-images.component.html',
  styleUrl: './carousel-images.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselImagesComponent {

  public coverInput = input.required<string>();
  public imagesInput = input.required<ProductImage[]>();
  public selectedInput = input.required<string>();
  public selectedOutput = output<string>();

  public changeImage(url: string): void {
    this.selectedOutput.emit(url);
  }
 }
