import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-pelvic',
    templateUrl: './pelvic.component.html',
})

export class PelvicComponent implements OnInit {
 
    ngOnInit(): void { }

    
  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
}

}
