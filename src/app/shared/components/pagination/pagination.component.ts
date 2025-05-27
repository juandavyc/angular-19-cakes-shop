import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, output } from '@angular/core';
import { Pagination } from '@shared/interfaces';

@Component({
  selector: 'pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {


  public totalPages = linkedSignal({
    source: () => this.paginationValues(),
    computation: (source) => {
      if (source) return Array.from({ length: source.total }, (_, i) => i);
      return [];
    }
  });

  paginationValues = input<Pagination | null>();

  pageChange = output<number>();

  public changePage(page: number | string) {
    this.pageChange.emit(Number(page));
  }

}
