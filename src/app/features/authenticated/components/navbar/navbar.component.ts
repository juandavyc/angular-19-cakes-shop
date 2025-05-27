import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { MenuItemsComponent } from '../menu-items/menu-items.component';

@Component({
  selector: 'navbar',
  imports: [
    LogoComponent,
    MenuItemsComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  public toggleSidebar = output<void>();


}
