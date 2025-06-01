import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItemsComponent } from '../menu-items/menu-items.component';
import { LogoComponent } from '@shared/components/logo/logo.component';


@Component({
  selector: 'app-sidebar',
  imports: [
    MenuItemsComponent,
    LogoComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public toggle = output<void>();

  public isShopRoute = input.required<boolean>();

  public handleToggleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName != "SUMMARY") this.toggle.emit();
  }
  public openSearchModal = output<void>();

  public onOpenSearchModal(): void {
    this.openSearchModal.emit();
  }
}
