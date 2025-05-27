import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../interfaces/products.response';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-item',
  imports: [
    RouterLink,
    TitleCasePipe,
    DecimalPipe,
    DatePipe,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {

  public product = input.required<Product>();

  public toDelete = output<string>();

}
