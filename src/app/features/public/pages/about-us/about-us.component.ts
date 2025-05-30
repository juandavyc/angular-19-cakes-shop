import { Component } from '@angular/core';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';
import { ChatAosAnimationPipe } from './pipes/chat-aos-animation.pipe';
import { ABOUT_US_CONFIG } from './configs/about-us.config';
import { ABOUT_US_ASSETS } from './configs/about-us.assets';
import { Chat } from './interfaces/chat.interface';

@Component({
  selector: 'app-about-us',
  imports: [
    HeroTitleComponent,
    OverviewComponent,
    ChatItemComponent,
    // pipes
    ChatAosAnimationPipe,
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export default class AboutUsComponent {

  public readonly title = ABOUT_US_CONFIG.title;
  public readonly subtitle = ABOUT_US_CONFIG.subtitle;

  public readonly left = ABOUT_US_ASSETS.images.left;
  public readonly right = ABOUT_US_ASSETS.images.right;

  public readonly chats: Chat[] = ABOUT_US_CONFIG.chats;

}
