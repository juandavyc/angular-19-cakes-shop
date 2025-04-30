import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CONFIG } from '@core/configs';

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

  public name = CONFIG.APP_NAME;
  public toggle = output<void>();

  public numberItemsOfCartInput = input.required<number>();
  public isShopRouteInput = input.required<boolean>();

  public openSearchModalOutput = output<void>();

  public openSearchModal():void{
    this.openSearchModalOutput.emit();
  }



}
