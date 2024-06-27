import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

    transform(number) {
        if (!number) {
            return "";
        }
        //number = number.charAt(0) != 0 ? "0" + number : "" + number;
        let newStr = "";
        let trimmed = number.replace(/[^0-9,.]+/g, "");
        if (trimmed.length > 12) {
            trimmed = trimmed.substr(0, 12);
        }
        trimmed = trimmed.replace(/-/g, '');
        let numbers = [];
        numbers.push(trimmed.substr(0, 3));
        if (trimmed.substr(3, 3) !== "")
            numbers.push(trimmed.substr(3, 3));
        if (trimmed.substr(6, 4) != "")
            numbers.push(trimmed.substr(6, 4));
        let value = "";
        value = numbers.join("-");
        if (numbers.length == 3) {
            let totalnumber = numbers[2];
            if (totalnumber.length == 4) {
                value = `(${numbers[0]}) ${numbers[1]}-${numbers[2]}`;
            }
            return newStr + value;
        }
    }
}
