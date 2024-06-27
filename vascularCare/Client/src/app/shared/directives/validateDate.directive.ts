import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, UntypedFormControl } from '@angular/forms';
import { dateValidator } from './validateDate.factory';

@Directive({
  selector: '[appDateField]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ValidateDateDirective, multi: true }
  ]
})
export class ValidateDateDirective implements Validator {
  private _valFn: ValidatorFn;

  constructor() {
    this._valFn = dateValidator();
  }

  validate(control: UntypedFormControl) {
    return this._valFn(control);
  }

}
