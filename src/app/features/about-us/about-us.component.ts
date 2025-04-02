import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ASSETS } from '@core/assets';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';

@Component({
  selector: 'app-about-us',
  imports: [
    HeroTitleComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent {

  public title = 'Nosotros';
  public subtitle = 'Endulzando tus mejores momentos';

  public diffLeft = ASSETS.ABOUTUS[0];
  public diffRight = ASSETS.ABOUTUS[1];

}
