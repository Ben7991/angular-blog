import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCaseFirstLetter',
})
export class UpperCaseFirstLetterPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    let firstLetter = value.substring(0, 1);
    let remainingLetters = value.substring(1, value.length);

    return firstLetter.toUpperCase() + remainingLetters;
  }
}
