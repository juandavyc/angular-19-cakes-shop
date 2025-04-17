import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shop-layout',
  imports: [
    RouterOutlet
  ],
  templateUrl: './shop-layout.component.html',
  styleUrl: './shop-layout.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopLayoutComponent { }
