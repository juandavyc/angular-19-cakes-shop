import { Injectable } from '@angular/core';
import { inject, linkedSignal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Breadcrumb } from '../interfaces/breadcrumb';

@Injectable({
  providedIn: 'root'
})

export class BreadcrumbService {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private breadcrumb$ = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(router => router.url)
    )
  );

  public breadcrumb = linkedSignal({
    source: () => this.breadcrumb$(),
    computation: (source) => {
      if (source && !['/home', '/'].includes(source)) {
        return [{ title: 'Home', path: '/' }, ...this.create(this.activatedRoute)]
      }
      return []
    }
  });

  private create(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {

    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }
    children.forEach((child) => {
      const routeURL: string = child.snapshot.url.map(seg => seg.path).join('/')
      if (routeURL) {
        url += `/${routeURL}`;
      }
      breadcrumbs.push({ title: child.snapshot.data['title'], path: url });
      return this.create(child, url, breadcrumbs);
    })
    return breadcrumbs;
  }


}
