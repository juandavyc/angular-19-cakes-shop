import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { RouterOutlet, ActivatedRoute,  Router } from '@angular/router';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';


@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    HeroTitleComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {

  public readonly title = "Productos";

  // private router = inject(Router);

  // private activatedRoute = inject(ActivatedRoute);

  // public title$: Observable<string> = this.router.events.pipe(
  //   filter(event => event instanceof NavigationEnd),
  //   map(() => this.activatedRoute),
  //   map(route => {
  //     while (route.firstChild) {
  //       route = route.firstChild;
  //     }
  //     return route;
  //   }),
  //   switchMap(route => route.data),
  //   map(data => data['title'] ?? 'Sin título')
  // );

}

