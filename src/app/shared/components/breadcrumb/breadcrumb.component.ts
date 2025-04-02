import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BreadcrumbService } from './services/breadcrumb.service';
import { Breadcrumb } from './interfaces/breadcrumb';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-breadcrumb',
  imports: [
    RouterLink,
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BreadcrumbComponent {

  private service = inject(BreadcrumbService);

  public breadcrumbs = computed<Breadcrumb[] | []>(()=>this.service.breadcrumb());

}
