import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';

@Component({
  selector: 'app-signup',
  imports: [
    HeroTitleComponent,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignupComponent {
  public readonly title = 'Crear una cuenta';
  public readonly subtitle = 'Pasteleria JB';
}
