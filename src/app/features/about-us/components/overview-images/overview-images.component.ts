import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'overview-images',
  imports: [],
  templateUrl: './overview-images.component.html',
  styleUrl: './overview-images.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewImagesComponent {

    left = input.required<string>();
    right = input.required<string>();

}
