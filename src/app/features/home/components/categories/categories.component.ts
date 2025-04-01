import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryItemComponent } from './componets/category-item/category-item.component';
import { ASSETS } from '@core/assets';
import { CategoryHero } from './interfaces/category.interfaces';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';


@Component({
  selector: 'categories',
  imports: [
    CategoryItemComponent,
    HeroTitleComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {


  public title = 'Celebra con nosotros';
  public subtitle = 'Hacemos tus momentos inolvidables';

  categories: CategoryHero[] = [
    {
      name: 'Cumpleaños',
      image: ASSETS.CATEGORIES[0],
      url: 'tienda?categoria=cumpleaños'
    },
    {
      name: 'Cumpleaños',
      image: ASSETS.CATEGORIES[1],
      url: 'tienda?categoria=cumpleaños'
    },
    {
      name: 'Grados',
      image: ASSETS.CATEGORIES[2],
      url: 'tienda?categoria=grados'
    },
    {
      name: 'Matrimonios',
      image: ASSETS.CATEGORIES[3],
      url: 'tienda?categoria=matrimonios'
    },
    {
      name: 'Corporativos',
      image: ASSETS.CATEGORIES[4],
      url: 'tienda?categoria=corporativos'
    },
    {
      name: 'Regalos',
      image: ASSETS.CATEGORIES[5],
      url: 'tienda?categoria=regalos'
    },
    {
      name: 'Todos',
      image: ASSETS.CATEGORIES[6],
      url: 'tienda'
    },
  ];

}
