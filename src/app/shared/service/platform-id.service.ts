import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformIdService {

  private platformId = inject(PLATFORM_ID);

  constructor() { }

  public isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

}
