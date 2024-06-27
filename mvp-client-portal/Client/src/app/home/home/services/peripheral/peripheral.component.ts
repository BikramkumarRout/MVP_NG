import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-peripheral',
    templateUrl: './peripheral.component.html',
})

export class PeripheralComponent implements OnInit {
 
    ngOnInit(): void { }

    
  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
}

}
