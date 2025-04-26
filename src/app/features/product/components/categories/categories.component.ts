import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductCategory } from '../../interfaces/product-response.interface';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'categories',
  imports: [
    RouterLink,
    TitleCasePipe,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {

  public categoriesInput = input.required<ProductCategory[]>();

}
