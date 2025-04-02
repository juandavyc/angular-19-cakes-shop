import { Component, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CONFIG } from '@core/configs';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive

  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  name = CONFIG.APP_NAME;
  toggle = output<void>();

}
