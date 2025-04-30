import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { HOME_CONFIGS } from '../../configs/home.configs';

@Component({
  selector: 'perfect',
  imports: [
    HeroTitleComponent,
  ],
  templateUrl: './perfect.component.html',
  styleUrl: './perfect.component.css',
})
export class PerfectComponent {

  public readonly title = HOME_CONFIGS.perfect.title;

}
