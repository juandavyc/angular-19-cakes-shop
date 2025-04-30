import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatHero } from './interface/StatHero';
import { NgClass } from '@angular/common';
import { HOME_CONFIGS } from '../../configs/home.configs';


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

  public readonly stats:StatHero[]=[

    {
      icon: 'fa-solid fa-cake-candles',
      title: 'Pasteles',
      value: HOME_CONFIGS.stats.cakes,
      desc: 'Entregados'
    },
    {
      icon: 'fa-solid fa-calendar-check',
      title: 'Experiencia',
      value: HOME_CONFIGS.stats.years,
      desc: 'Endulzando momentos'
    },
    {
      icon: 'fa-solid fa-star',
      title: 'Valoracion',
      value: HOME_CONFIGS.stats.rating,
      desc: 'Reseñas de clientes'
    }
  ];

}
