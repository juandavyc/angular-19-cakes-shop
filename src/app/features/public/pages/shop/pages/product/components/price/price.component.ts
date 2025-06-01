import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'price',
  imports: [
    DecimalPipe,
  ],
  templateUrl: './price.component.html',
  styleUrl: './price.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceComponent {
  public price = input.required<number>();
 }
