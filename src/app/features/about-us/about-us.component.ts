import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ASSETS } from '@core/assets';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { OverviewComponent } from './components/overview/overview.component';
import { OverviewImagesComponent } from './components/overview-images/overview-images.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';
import { ChatAosAnimationPipe } from './pipes/chat-aos-animation.pipe';

@Component({
  selector: 'app-about-us',
  imports: [
    HeroTitleComponent,
    OverviewComponent,
    OverviewImagesComponent,
    ChatItemComponent,
    // pipes
    ChatAosAnimationPipe,
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent {

  public title = 'Nosotros';
  public subtitle = 'Endulzando tus mejores momentos';

  public left = ASSETS.ABOUTUS.images[0];
  public right = ASSETS.ABOUTUS.images[1];


  public chats = ASSETS.ABOUTUS.chat;

}
