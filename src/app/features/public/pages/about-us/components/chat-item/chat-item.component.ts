import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'chat-item',
  imports: [],
  templateUrl: './chat-item.component.html',
  styleUrl: './chat-item.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatItemComponent {

  isSender = input.required<boolean>();
  message = input.required<string>();

}
