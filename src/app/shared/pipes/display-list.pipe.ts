import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayList',
  standalone: true,
})
export class DisplayListPipe implements PipeTransform {
  transform<T extends number | string>(value: T[], separator = ', '): string {
    return value.join(separator);
  }
}
