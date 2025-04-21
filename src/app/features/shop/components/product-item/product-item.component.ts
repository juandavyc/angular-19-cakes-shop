import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../interfaces';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

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

}
