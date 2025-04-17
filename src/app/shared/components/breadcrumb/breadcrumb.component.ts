import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal } from '@angular/core';
import { BreadcrumbService } from './services/breadcrumb.service';
import { Breadcrumb } from './interfaces/breadcrumb';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';


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


  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private service = inject(BreadcrumbService);

  private breadcrumb$ = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(router => router.url)
    )
  );

  public breadcrumbs = linkedSignal({
    source: () => this.breadcrumb$(),
    computation: (source) => {
      if (source && !['/home', '/'].includes(source)) {
        return [{ title: 'Home', path: '/' }, ...this.service.create(this.activatedRoute)]
      }
      return []
    }
  });




}
