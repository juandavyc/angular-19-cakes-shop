import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONFIG } from '@core/configs';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { title } from 'process';

@Component({
  selector: 'app-contact',
  imports: [
    HeroTitleComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {

  title = 'Contáctanos';
  subtitle = 'A unos clicks de distancia';



    public facebookUrl = CONFIG.SOCIAL.url.facebook;
    public instagramUrl = CONFIG.SOCIAL.url.instagram;
    public tiktokUrl = CONFIG.SOCIAL.url.tiktok;
    public whatsappUrl = CONFIG.SOCIAL.url.whatsapp;

    public facebook = CONFIG.SOCIAL.title.facebook;
    public instagram = CONFIG.SOCIAL.title.instagram;
    public tiktok = CONFIG.SOCIAL.title.tiktok;
    public whatsapp = CONFIG.SOCIAL.title.whatsapp;
 }
