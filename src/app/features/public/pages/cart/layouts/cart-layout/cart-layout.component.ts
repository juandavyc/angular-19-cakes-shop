import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cart-layout',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './cart-layout.component.html',
  styleUrl: './cart-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartLayoutComponent { }
