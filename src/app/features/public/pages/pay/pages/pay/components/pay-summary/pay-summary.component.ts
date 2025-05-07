import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Summary } from '../../interfaces';

@Component({
  selector: 'pay-summary',
  imports: [
    DecimalPipe,
  ],
  templateUrl: './pay-summary.component.html',
  styleUrl: './pay-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaySummaryComponent {

  public summaryInput = input.required<Summary>();
  public hasProductsInput = input.required<boolean>();

  public toPayOutput = output<void>();

}
