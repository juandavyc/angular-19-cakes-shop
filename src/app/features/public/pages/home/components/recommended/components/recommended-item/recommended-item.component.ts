import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Recommended } from '../../interfaces/recommended.interface';
import { CONFIG } from '@core/configs';


@Component({
  selector: 'recommended-item',
  imports: [
  ],
  templateUrl: './recommended-item.component.html',
  styleUrl: './recommended-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class RecommendedItemComponent {

  public recommended = input.required<Recommended>();

  private tips: string[] = CONFIG.TOOLTIPS;

  public getRandomToolTip():string {
    const index = Math.floor(Math.random() * this.tips.length);
    return this.tips[index] ?? '';
  }

}
