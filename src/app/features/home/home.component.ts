import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { PerfectComponent } from './components/perfect/perfect.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { StatsComponent } from './components/stats/stats.component';

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
export class HomeComponent { }
