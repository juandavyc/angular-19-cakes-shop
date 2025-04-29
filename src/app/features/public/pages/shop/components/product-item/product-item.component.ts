import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces';


@Component({
  selector: 'product-item',
  imports: [
    RouterLink,
    TitleCasePipe,
    DecimalPipe
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {

  public productInput = input.required<Product>();

  public addToCartOutput = output<void>();

  public addToCart():void{
    this.addToCartOutput.emit();
  }
}
