import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { PerfectComponent } from './components/perfect/perfect.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { StatsComponent } from './components/stats/stats.component';
import { SeoService } from '@core/services/seo.service';
import { HOME_CONFIGS } from './configs/home.configs';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    StatsComponent,
    RecommendedComponent,
    PerfectComponent,
    CategoriesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  private seo = inject(SeoService);
  // private recommendedContainer = viewChild<ElementRef<HTMLDivElement>>('recommendedContainer');

  constructor() {
    this.seo.setSeoMetadata(HOME_CONFIGS.seo);
  }

  // public scrollToRecommended(): void {
  //   const container = this.recommendedContainer();
  //   if (container) {
  //     container.nativeElement.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start'
  //     });
  //   }
  // }

}
