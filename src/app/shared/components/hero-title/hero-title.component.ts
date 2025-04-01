import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'hero-title',
  imports: [],
  templateUrl: './hero-title.component.html',
  styleUrl: './hero-title.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroTitleComponent {

  title = input.required<string>();
  subtitle = input<string>();

}
