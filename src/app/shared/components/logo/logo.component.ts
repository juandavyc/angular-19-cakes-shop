import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONFIG } from '@core/configs';

@Component({
  selector: 'logo',
  imports: [
    RouterLink,
  ],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  public readonly appName = CONFIG.APP_NAME;
}
