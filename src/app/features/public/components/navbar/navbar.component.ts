import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CONFIG } from '@core/configs';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  public name = CONFIG.APP_NAME;
  public toggle = output<void>();

  public numberItemsOfCartInput = input.required<number>();

  public isShopRouteInput = input.required<boolean>();

  public openSearchModalOutput = output<void>();

  public openSearchModal():void{
    this.openSearchModalOutput.emit();
  }

}
