import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductOccasion } from '../../interfaces/product-response.interface';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'occasions',
  imports: [
    RouterLink,
    TitleCasePipe,
  ],
  templateUrl: './occasions.component.html',
  styleUrl: './occasions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OccasionsComponent {

  public occasionsInput = input.required<ProductOccasion[]>();

}
