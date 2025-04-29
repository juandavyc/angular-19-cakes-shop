import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatAosAnimation',
})
export class ChatAosAnimationPipe implements PipeTransform {

  transform(isSender:boolean, index:number): unknown {
    return index > 2 ? (isSender ? 'fade-up' : 'fade-right') : null;
  }

}
