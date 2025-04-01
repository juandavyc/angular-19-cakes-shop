import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterOutlet,
    FooterComponent,
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
