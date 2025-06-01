import { Component, input, output } from '@angular/core';
import { CONFIG } from '@core/configs';
import { MenuItemsComponent } from '../menu-items/menu-items.component';
import { LogoComponent } from '@shared/components/logo/logo.component';

@Component({
  selector: 'app-navbar',
  imports: [
    MenuItemsComponent,
    LogoComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  public name = CONFIG.APP_NAME;
  //public numberItemsOfCartInput = input.required<number>();
  public toggleSidebar = output<void>();
  public isShopRoute = input.required<boolean>();
  public openSearchModal = output<void>();

  public onOpenSearchModal():void{
    this.openSearchModal.emit();
  }

  public onToggleSidebar():void{
      this.toggleSidebar.emit();
  }

}
