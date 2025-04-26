import {  Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CONFIG } from '@core/configs';
import { CartDetailsComponent } from 'src/app/features/cart/components/cart-details/cart-details.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {

  name = CONFIG.APP_NAME;

  openCartInput = input<boolean>(false);


  toggle = output<void>();

}
