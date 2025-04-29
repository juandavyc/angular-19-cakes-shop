import { inject, Injectable } from '@angular/core';
import { PlatformIdService } from './platform-id.service';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private platformIdService = inject(PlatformIdService);

  private scrollPoints = 150;

  constructor() { }

  scrollLeft(divToScroll: HTMLDivElement) {
    if (!this.platformIdService.isBrowser()) return;
    divToScroll.scrollBy({ left: (this.scrollPoints * -1), behavior: 'smooth' });
  }

  scrollRight(divToScroll: HTMLDivElement) {
    if (!this.platformIdService.isBrowser()) return;
    divToScroll.scrollBy({ left: (this.scrollPoints), behavior: 'smooth' });
  }

  scrollTop(divToScroll: HTMLDivElement) {
    if (!this.platformIdService.isBrowser()) return;
    divToScroll.scrollBy({ top: (this.scrollPoints * - 1), behavior: 'smooth' });
  }

  scrollBottom(divToScroll: HTMLDivElement) {
    if (!this.platformIdService.isBrowser()) return;
    divToScroll.scrollBy({ top: (this.scrollPoints), behavior: 'smooth' });
  }


}
