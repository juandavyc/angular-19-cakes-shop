import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';

@Component({
  selector: 'app-order',
  imports: [
    HeroTitleComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrderComponent {

  public readonly title = 'Pedido';
  public readonly subtitle = 'Ya solo falta un ultimo paso';





}
