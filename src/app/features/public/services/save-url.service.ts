import { computed, inject, Injectable, signal } from '@angular/core';
import { PlatformIdService } from '@shared/service/platform-id.service';

@Injectable({ providedIn: 'root' })

export class SaveUrlService {

  private currentUrl = signal<string | null>(null);

  public setUrl(url: string): void {
    this.currentUrl.set(url);
  }

  public getUrl = computed(() => {
    const url = this.currentUrl();
    return url ? url : '/shop';
  })

}
