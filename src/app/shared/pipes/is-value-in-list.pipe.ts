import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isValueInList',
  standalone: true,
})
export class IsValueInListPipe implements PipeTransform {
  transform<T>(value: T, list: T[]): boolean {
    return list.includes(value);
  }
}
