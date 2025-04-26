import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { SocialNetworks } from './enums/social-networks.enum';
import { isPlatformBrowser, TitleCasePipe } from '@angular/common';


@Component({
  selector: 'social-share',
  imports: [

    TitleCasePipe,
  ],
  templateUrl: './social-share.component.html',
  styleUrl: './social-share.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SocialShareComponent {


  private platformId = inject(PLATFORM_ID);

  public socialNetworks = SocialNetworks;

  private socialNetworksMap = new Map<SocialNetworks, string>([
    [SocialNetworks.FACEBOOK, 'https://www.facebook.com/sharer/sharer.php?u='],
    [SocialNetworks.WHATSAPP, 'https://api.whatsapp.com/send?text='],
  ]);

  public shareWith(socialNetworks: SocialNetworks): void {

    if (isPlatformBrowser(this.platformId)) {
      const url = this.socialNetworksMap.get(socialNetworks);
      const currentUrl = window.location.href;
      window.open(`${url}${currentUrl}`);
    }

  }

}
