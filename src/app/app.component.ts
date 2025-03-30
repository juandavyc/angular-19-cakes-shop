import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent } from '@shared/components/footer/footer.component';


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
export class AppComponent {

  title = 'pasteleria-jb-ssr';

  public isOpen = signal<boolean>(false);

  public toggleDrawer(){
    this.isOpen.update(value=>!value);
  }



}
