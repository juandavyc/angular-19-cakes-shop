import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

import AOS from 'aos';
import { CartDetailsComponent } from './features/cart/components/cart-details/cart-details.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    CartDetailsComponent,
    RouterOutlet,
    FooterComponent,
    //AppCartDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'pasteleria-jb-ssr';

  private platformId = inject(PLATFORM_ID);

  public isOpen = signal<boolean>(false);

  public toggleDrawer(){
    this.isOpen.update(value=>!value);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 700,
      });
    }
  }


}
