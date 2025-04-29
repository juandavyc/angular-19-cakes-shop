import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'cover-image',
  imports: [],
  templateUrl: './cover-image.component.html',
  styleUrl: './cover-image.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoverImageComponent {

  public selectedImageInput = input.required<string>();

}
