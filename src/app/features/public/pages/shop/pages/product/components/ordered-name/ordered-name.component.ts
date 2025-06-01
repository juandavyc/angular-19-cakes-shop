import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'ordered-name',
  imports: [
    TitleCasePipe,
  ],
  templateUrl: './ordered-name.component.html',
  styleUrl: './ordered-name.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderedNameComponent {

  public name = input.required<string>();
  public isTop= input.required<boolean>();

  public classContainer = computed(() => (this.isTop()) ? 'lg:hidden block' : 'lg:block hidden');
  public classesName = computed(() => (this.isTop()) ? 'text-2xl font-bold' : 'sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold');

}
