import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ASSETS } from '@core/assets';


@Component({
  selector: 'hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {

    public logo:string = ASSETS.LOGO;
    public background = { 'background-image': `url(${ASSETS.HERO_BACKGROUND})` };

}
