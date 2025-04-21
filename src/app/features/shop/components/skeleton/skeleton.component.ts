import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton',
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {

}
