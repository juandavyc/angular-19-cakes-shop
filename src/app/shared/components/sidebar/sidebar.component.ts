import {  Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CONFIG } from '@core/configs';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {

  name = CONFIG.APP_NAME;
  toggle = output<void>();

}
