import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { CONTACT_US_CONFIG } from './config/contact-us.config';
import { NgClass } from '@angular/common';
import { SocialNetwork } from '@core/interfaces/social-network.interface';

@Component({
  selector: 'app-contact',
  imports: [
    HeroTitleComponent,
    NgClass,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent {

  public readonly title = CONTACT_US_CONFIG.title;
  public readonly subtitle = CONTACT_US_CONFIG.subtitle;

  public readonly socialNetworks: SocialNetwork[] = CONTACT_US_CONFIG.socialNetworks;

  public readonly address = CONTACT_US_CONFIG.address;
  public readonly number = CONTACT_US_CONFIG.number;
  public readonly email = CONTACT_US_CONFIG.email;

}
