import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
@Component({
  selector: 'pm-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  locationList:any=1;
  constructor(public ref: DynamicDialogRef) { }

  ngOnInit(): void {
  }
  close() {
    this.ref.close({data:true});
}
}
