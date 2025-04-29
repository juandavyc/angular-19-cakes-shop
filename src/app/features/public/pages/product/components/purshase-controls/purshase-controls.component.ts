import { ChangeDetectionStrategy, Component, output } from '@angular/core';


@Component({
  selector: 'purshase-controls',
  imports: [],
  templateUrl: './purshase-controls.component.html',
  styleUrl: './purshase-controls.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurshaseControlsComponent {

  public addToCartOutput = output<void>();

  // public buyProduct(): void {
  //   if (product) {
  //     console.log("id:", product);
  //   }
  // }

  public addToCart() {
    this.addToCartOutput.emit();
  }

}
