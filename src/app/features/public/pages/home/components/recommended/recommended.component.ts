import { Component } from '@angular/core';
import { RecommendedItemComponent } from './components/recommended-item/recommended-item.component';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { HOME_CONFIGS } from '../../configs/home.configs';
import { RecommendedCake } from './interfaces/recommended.interface';


@Component({
  selector: 'recommended',
  imports: [
    RecommendedItemComponent,
    HeroTitleComponent
  ],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendedComponent {

  public readonly dataAOS =['fade-right', 'fade-up', 'fade-up', 'fade-right'];

  public readonly title = HOME_CONFIGS.recommended.title;
  public readonly subtitle = HOME_CONFIGS.recommended.subtitle;

  public readonly recommendedList: RecommendedCake[] = HOME_CONFIGS.recommended.cakes;

}
