import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CONFIG } from '@core/configs';
import { RecommendedCake } from '../../interfaces/recommended.interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'recommended-item',
  imports: [
    RouterLink
  ],
  templateUrl: './recommended-item.component.html',
  styleUrl: './recommended-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class RecommendedItemComponent {

  public recommended = input.required<RecommendedCake>();

}
