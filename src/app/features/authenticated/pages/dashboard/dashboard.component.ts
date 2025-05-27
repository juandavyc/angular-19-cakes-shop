import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    HeroTitleComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {


}
