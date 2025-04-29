import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';

@Component({
  selector: 'perfect',
  imports: [
    HeroTitleComponent,
  ],
  templateUrl: './perfect.component.html',
  styleUrl: './perfect.component.css',
})
export class PerfectComponent {

  title = '¡El pastel perfecto en 4 pasos!';

}
