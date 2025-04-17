import { Injectable, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../interfaces/breadcrumb';

@Injectable({
  providedIn: 'root'
})

export class BreadcrumbService {


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
