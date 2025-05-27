import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent { }
