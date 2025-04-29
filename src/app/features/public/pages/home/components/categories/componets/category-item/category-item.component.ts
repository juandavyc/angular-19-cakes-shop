import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryHero } from '../../interfaces/category.interfaces';

@Component({
  selector: 'category-item',
  imports: [
    RouterLink
  ],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryItemComponent {
  public category = input.required<CategoryHero>();
}
