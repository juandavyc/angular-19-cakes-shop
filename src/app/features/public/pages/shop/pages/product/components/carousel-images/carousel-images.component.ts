import { afterNextRender, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, CUSTOM_ELEMENTS_SCHEMA , viewChild } from '@angular/core';
import { ProductImage } from '../../interfaces/product-response.interface';
import { Navigation, Pagination } from 'swiper/modules';
import { PlatformIdService } from '@shared/service/platform-id.service';

import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';




@Component({
  selector: 'carousel-images',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './carousel-images.component.html',
  styleUrl: './carousel-images.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselImagesComponent {


  public cover = input.required<string>();
  public images = input.required<ProductImage[]>();

  private swiperRef = viewChild.required<ElementRef<SwiperContainer>>('swiperRef');

  constructor() {
    afterNextRender(() => {
      this.initSwiper();
    });
  }


  private initSwiper() {
    const swiperOptions: SwiperOptions = {
      slidesPerView: 1,  // Muestra solo 1 slide a la vez
      spaceBetween: 30,
      loop: true,        // Permite navegación infinita
      centeredSlides: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        clickable: true,
      },
    };


    Object.assign(this.swiperRef().nativeElement, swiperOptions);
    this.swiperRef().nativeElement.initialize();
  }
}
