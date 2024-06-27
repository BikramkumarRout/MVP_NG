import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";
import { DATE_REGEX, NUMBERSlash } from "./formUtils.factory";
@Directive({
  selector: '[appDateInput]'
})
export class ValidateDateInputDirective {

  constructor(public ngControl: NgControl) { }


  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    //let trimmed = input.value.replace(/[^0-9,.]+/g, "");

    const dateStr = input.value;
    // Length of months (will update for leap years)
    const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    // Object to return if date is invalid
    const invalidObj = { 'date': true };

    // First check for m/d/yyyy or mm/dd/yyyy format
    // If the pattern is wrong, don't validate dates yet
    

    if (!NUMBERSlash.test(dateStr)) {
      input.value = null;
    }
    else{
      input.value = dateStr;
    }
    // if (dateStr.length === 10) {
    //   if (!DATE_REGEX.test(dateStr)) {
    //     input.value = null;
    //   }
    //   else {
    //     input.value = dateStr;
    //   }
    // }



  }
}
