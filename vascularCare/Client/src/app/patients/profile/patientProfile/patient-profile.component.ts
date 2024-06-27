import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'profile-patient-profile',
  templateUrl: './patient-profile.component.html',
 styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnChanges  {

@Input() profileData: any=[];
 
  ngOnChanges(): void {
  }


}
