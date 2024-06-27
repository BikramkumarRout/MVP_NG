import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'facility-location',
  templateUrl: './facility-location.component.html',
  styleUrls: ['./facility-location.component.css']
})

export class FacilityLocationComponent implements OnInit {
    // locationList = 1;
  @Input() display: boolean;
  @Input() locationList: number;
  @Output() displayChange = new EventEmitter();

constructor() {
    
    
}
  ngOnInit() {

  }
  onClose() {
    this.displayChange.emit(false);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }


}