import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-dialysis',
    templateUrl: './dialysis.component.html',
})

export class DialysisComponent implements OnInit {
 
    ngOnInit(): void { }

    
  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
}

}
