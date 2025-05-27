import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { MenuItemsComponent } from '../menu-items/menu-items.component';

@Component({
  selector: 'sidebar',
  imports: [
    LogoComponent,
    MenuItemsComponent,
  ],
  host: {
    'class': 'drawer-side z-20'
  },
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {

  public toggle = output<void>();

  public handleToggleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName != "SUMMARY") this.toggle.emit();
  }

}
