import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";
@Directive({
  selector: '[phoneMask]'
})
export class PhoneMaskDirective {

  constructor(public ngControl: NgControl) { }


  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/[^0-9,.]+/g, "");

    if (trimmed.length > 12) {
      trimmed = trimmed.substr(0, 12);
    }

    trimmed = trimmed.replace(/-/g,'');

    let numbers = [];
    numbers.push(trimmed.substr(0,3));
    if(trimmed.substr(3,3)!=="")
    numbers.push(trimmed.substr(3,3));
    if(trimmed.substr(6,4)!="")
      numbers.push(trimmed.substr(6, 4));
    let value = "";
    value = numbers.join("-");
    if (numbers.length == 3) {
      let totalnumber = numbers[2];
      if (totalnumber.length == 4) {
        value = `(${numbers[0]}) ${numbers[1]}-${numbers[2]}`;        
      }
    }
    input.value = value;    
  }
}
