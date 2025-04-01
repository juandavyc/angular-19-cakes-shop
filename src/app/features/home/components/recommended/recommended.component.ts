import { Component } from '@angular/core';
import { ASSETS } from '@core/assets';
import { Recommended } from './interfaces/recommended.interface';
import { RecommendedItemComponent } from './components/recommended-item/recommended-item.component';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';


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

  public dataAOS =['fade-right', 'fade-up', 'fade-up', 'fade-left'];

  public title = 'Recomendados';
  public subtitle = 'Nuestros clientes aman estos sabores';

  public recommendedList: Recommended[] = [
    {
      name: 'Chocolate',
      isNew: false,
      description: 'Ponque con decorado de crema Richs',
      image: ASSETS.RECOMMENDED[0]
    },
    {
      name: 'Vainilla',
      isNew: true,
      description: 'Ponque negro con crema Richs',
      image: ASSETS.RECOMMENDED[1]
    },
    {
      name: 'Fresa',
      isNew: false,
      description: 'Ponque con frutos rojos',
      image: ASSETS.RECOMMENDED[2]
    },
    {
      name: 'Red Velvet',
      isNew: true,
      description: 'Ponque relleno de frutos amarillos',
      image: ASSETS.RECOMMENDED[3]
    }
  ];


}
