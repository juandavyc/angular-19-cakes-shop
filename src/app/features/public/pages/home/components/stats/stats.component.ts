import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatHero } from './interface/StatHero';
import { CONFIG } from '@core/configs';
import { NgClass } from '@angular/common';


@Component({
  selector: 'stats',
  imports: [
   NgClass
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent {

  stats:StatHero[]=[

    {
      icon: 'fa-solid fa-cake-candles',
      title: 'Pasteles',
      value: CONFIG.STATS.cakes,
      desc: 'Entregados'
    },
    {
      icon: 'fa-solid fa-calendar-check',
      title: 'Experiencia',
      value: CONFIG.STATS.years,
      desc: 'Endulzando momentos'
    },
    {
      icon: 'fa-solid fa-star',
      title: 'Valoracion',
      value: CONFIG.STATS.rating,
      desc: 'Reseñas de clientes'
    }
  ];

}
