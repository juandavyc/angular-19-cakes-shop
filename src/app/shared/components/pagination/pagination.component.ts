import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Pagination } from '@shared/interfaces';

@Component({
  selector: 'pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {

  pagePagination = input<Pagination | null >();

  pageOutput = output<number>();

  goToPage(page:number){
    this.pageOutput.emit(page);
  }

}
