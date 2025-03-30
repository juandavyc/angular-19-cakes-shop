import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { PerfectComponent } from './components/perfect/perfect.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    RecommendedComponent,
    PerfectComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
