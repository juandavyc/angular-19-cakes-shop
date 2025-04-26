import { inject, Injectable } from '@angular/core';
import { PlatformIdService } from './platform-id.service';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private platformIdService = inject(PlatformIdService);

  constructor() { }

  scrollLeft(divToScroll: HTMLDivElement) {

    if (!this.platformIdService.isBrowser()) return;
    divToScroll.scrollBy({ left: -100, behavior: 'smooth' });

  }

  scrollRight(divToScroll: HTMLDivElement) {
    if (!this.platformIdService.isBrowser()) return;
    divToScroll.scrollBy({ left: 100, behavior: 'smooth' });
  }



}
