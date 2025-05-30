
import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncatePipe',
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (!value) return '';
    if (value.length >= limit) {
      return value.substring(0, limit).concat('...');
    }
    return value;
  }

}
