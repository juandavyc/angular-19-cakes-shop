import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ASSETS } from '@core/assets';


@Component({
  selector: 'hero',
  imports: [
    RouterLink,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {



  public readonly logo = ASSETS.LOGO;
  public readonly background = { 'background-image': `url(${ASSETS.HERO_BACKGROUND})` };

}
