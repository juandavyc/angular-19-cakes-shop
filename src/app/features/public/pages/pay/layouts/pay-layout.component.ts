import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pay-layout',
  imports: [
    RouterOutlet
  ],
  templateUrl: './pay-layout.component.html',
  styleUrl: './pay-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayLayoutComponent { }
