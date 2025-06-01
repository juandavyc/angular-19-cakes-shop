import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CartProductPreviewComponent } from './components/cart-product-preview/cart-product-preview.component';
import { ShopSearchModalComponent } from './components/shop-search-modal/shop-search-modal.component';

@Component({
  selector: 'app-public',
  imports: [
    NavbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    CartProductPreviewComponent,
    ShopSearchModalComponent,
    RouterOutlet,
    FooterComponent,
  ],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicComponent {

  private router = inject(Router);
  // private cartService = inject(CartService);
  private shopSearchModal = viewChild<ShopSearchModalComponent>('shopSearchModal');

  public isOpen = signal<boolean>(false);
  // public numberItemsOfCart = computed(()=> this.cartService.numberItems());

  public toggleDrawer() {
    this.isOpen.update(value => !value);
  }

  public isPayRoute(): boolean {
    return this.router.url.startsWith('/pay');
  }
  public isShopRoute(): boolean {
    return this.router.url.startsWith('/shop');
  }

  public openSearchModal() {
    this.shopSearchModal()!.openModal(true);
  }

}
