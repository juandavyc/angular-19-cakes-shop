import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

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

  public authStatus = computed(()=>{
    return this.authService.authStatus();
  })

  public authUser = computed(()=>{
    return this.authService.user();
  })

  private authService = inject(AuthService);

  public isMobile = input<Boolean>(false);

  public closeDetails(element: HTMLDetailsElement) {
    if (!this.isMobile()) element.open = false;
  }

  public logout(){
    this.authService.logout();
  }
}
