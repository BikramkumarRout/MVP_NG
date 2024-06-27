import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numbersOnly]'
})
export class NumberDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const input = event.target as HTMLInputElement;
    const initalValue = input.value;
  
    let finalValue = input.value.replace(/[^0-9/]*/g, '');
    if ( initalValue !== finalValue) {
        input.value = null;
      event.stopPropagation();
    }


  }

}