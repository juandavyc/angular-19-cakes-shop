import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-layout',
  imports: [
    RouterOutlet
  ],
  templateUrl: './product-layout.component.html',
  styleUrl: './product-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLayoutComponent { }
