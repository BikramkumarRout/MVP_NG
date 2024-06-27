import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pm-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.css']
})
export class ValidationErrorsComponent implements OnInit {
  @Input() text:string | undefined;
  @Input() formCtrl;
  // @Input() prevFormCtrl;
  constructor() { }

  ngOnInit(): void {
  }
  

}
