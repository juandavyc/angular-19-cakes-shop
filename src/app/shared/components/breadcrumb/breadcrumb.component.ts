import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal } from '@angular/core';
import { Breadcrumb } from './interfaces/breadcrumb';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';


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

  private breadcrumb = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(router => router.url),
      startWith(this.router.url)
    )
  );

  public breadcrumbs = linkedSignal({
    source: () => this.breadcrumb(),
    computation: (source) => {
      if (source && !['/home', '/'].includes(source)) {
        return [{ title: 'Home', path: '/' }, ...this.create(this.activatedRoute)]
      }
      else{
        return []
      }
    }
  });


  public create(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {

    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL = child.snapshot.url.map(seg => seg.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
      }

      const title = child.snapshot.data['title'];
      if (title && !breadcrumbs.find(b => b.path === url)) {
        breadcrumbs.push({ title, path: url });
      }

      // seguir recursivamente
      this.create(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }




}
