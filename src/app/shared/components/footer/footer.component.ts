import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ASSETS } from '@core/assets';
import { CONFIG } from '@core/configs';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {

  public logo = ASSETS.LOGO;
  public name = CONFIG.APP_NAME;
  public year = new Date().getFullYear();

  public nameDeveloper = CONFIG.CREDITS.name;
  public urlDeveloper = CONFIG.CREDITS.url;

  public facebookUrl = CONFIG.SOCIAL.url.facebook;
  public instagramUrl = CONFIG.SOCIAL.url.instagram;
  public tiktokUrl = CONFIG.SOCIAL.url.tiktok;
  public whatsappUrl = CONFIG.SOCIAL.url.whatsapp;

  public facebook = CONFIG.SOCIAL.title.facebook;
  public instagram = CONFIG.SOCIAL.title.instagram;
  public tiktok = CONFIG.SOCIAL.title.tiktok;
  public whatsapp = CONFIG.SOCIAL.title.whatsapp;

}
