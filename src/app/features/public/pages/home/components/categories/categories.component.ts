import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryItemComponent } from './componets/category-item/category-item.component';
import { ASSETS } from '@core/assets';
import { CategoryHero } from './interfaces/category.interfaces';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { HOME_CONFIGS } from '../../configs/home.configs';


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


  public readonly title = HOME_CONFIGS.categories.title;
  public readonly subtitle = HOME_CONFIGS.categories.subtitle;

  public readonly categories: CategoryHero[] = HOME_CONFIGS.categories.occasions;

}
