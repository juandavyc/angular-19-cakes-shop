import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'no-results',
  imports: [],
  templateUrl: './no-results.component.html',
  styleUrl: './no-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoResultsComponent {

}
