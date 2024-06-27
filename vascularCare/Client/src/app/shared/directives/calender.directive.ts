import { NgControl } from '@angular/forms';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[pmCalender]'
})
export class CalenderDirective {

  constructor(public ngControl: NgControl) { }
  @HostListener('input', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;
    if(e.which !== 8) {
      var thisVal;
      var numChars = input.value.length;
      if(numChars === 2 || numChars === 5){
          thisVal = input.value;
          thisVal += '/';
          input.value = thisVal;
      }else if(numChars>=10){
        input.value=input.value.substring(0,10);
      }
  }
}

}