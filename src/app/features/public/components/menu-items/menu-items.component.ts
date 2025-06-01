import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'menu-items',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  host: {
    'class': 'menu'
  },
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemsComponent {

  public isMobile = input<Boolean>(false);


}
