import {  Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

  toggle = output<void>();

}
