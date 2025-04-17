import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { Pagination } from '@shared/interfaces';
import { FormFilterService } from '../../services/form-filter.service';

@Component({
  selector: 'pagination-form',
  imports: [
    PaginationComponent
  ],
  templateUrl: './pagination-form.component.html',
  styleUrl: './pagination-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationFormComponent {

  formFilterService = inject(FormFilterService);

  pagePagination = input<Pagination | null>();

  gotToPage(page: number) {
      this.formFilterService.form.controls.page.setValue(page.toString());
  }

}
