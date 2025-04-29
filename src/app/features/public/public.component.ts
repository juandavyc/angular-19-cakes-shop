import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CartProductPreviewComponent } from './components/cart-product-preview/cart-product-preview.component';

@Component({
  selector: 'app-public',
  imports: [
    NavbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    CartProductPreviewComponent,
    RouterOutlet,
    FooterComponent,
  ],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicComponent {

  private router = inject(Router);

  public isOpen = signal<boolean>(false);

  public toggleDrawer() {
    this.isOpen.update(value => !value);
  }

  public isPayRoute(): boolean {
    return this.router.url.startsWith('/about-us');
  }

}
