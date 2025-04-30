import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ASSETS } from '@core/assets';
import { CONFIG } from '@core/configs';
import { CONTACT_US } from '@core/configs/contact-us/contact-us.config';
import { SocialNetwork } from '@core/interfaces/social-network.interface';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    NgClass,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {

  public readonly logo = ASSETS.LOGO;
  public readonly name = CONFIG.APP_NAME;
  public year = new Date().getFullYear();

  public readonly nameDeveloper = CONFIG.CREDITS.name;
  public readonly urlDeveloper = CONFIG.CREDITS.url;

  public readonly socialNetworks:SocialNetwork[] = CONTACT_US.socialNetworks;

}
