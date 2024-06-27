import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'profile-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']

})
export class InsuranceComponent implements OnChanges {
  @Input() insuranceData: any=[];
 
  ngOnChanges(): void {}
}
