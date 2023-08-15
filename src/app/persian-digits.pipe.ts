import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianDigits'
})
export class PersianDigitsPipe implements PipeTransform {

  transform(value: string | null): string {
    if (!value) {
      return '';
    }

    const westernDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return value.split('').map(char => {
      if (westernDigits.includes(char)) {
        return persianDigits[westernDigits.indexOf(char)];
      }
      return char;
    }).join('');
  }

}
