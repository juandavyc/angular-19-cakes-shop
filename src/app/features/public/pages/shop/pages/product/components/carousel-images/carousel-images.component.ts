import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { ProductImage } from '../../interfaces/product-response.interface';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { PlatformIdService } from '@shared/service/platform-id.service';


@Component({
  selector: 'carousel-images',
  imports: [],
  templateUrl: './carousel-images.component.html',
  styleUrl: './carousel-images.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselImagesComponent implements AfterViewInit {


  public cover = input.required<string>();
  public images = input.required<ProductImage[]>();

  private swiperDiv = viewChild.required<ElementRef<HTMLDivElement>>('swiperDiv');

  private platformIdService = inject(PlatformIdService)

  // const swiper = new Swiper('.swiper', {
  //   // configure Swiper to use modules
  //   modules: [Navigation, Pagination],
  //   ...
  // });




  ngAfterViewInit(): void {


    const element = this.swiperDiv().nativeElement;
    if (!element) return;
    if (this.platformIdService.isBrowser()) {
      const swiper = new Swiper(element, {
        direction: 'horizontal',
        loop: true,
        modules: [Navigation, Pagination],
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
        }
      });
    }


  }
}
