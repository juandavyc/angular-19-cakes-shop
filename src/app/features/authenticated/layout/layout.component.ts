import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@authenticated/components/navbar/navbar.component';
import { SidebarComponent } from '@authenticated/components/sidebar/sidebar.component';
import { FooterComponent } from '@shared/components/footer/footer.component';

@Component({
  selector: 'layout',
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {

  public isOpen = signal<boolean>(false);


  public toggleSidebar(): void {
    this.isOpen.update(value => !value);
  }
}
