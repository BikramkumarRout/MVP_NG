import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-prostatic',
    templateUrl: './prostatic.component.html',
})

export class ProstaticComponent implements OnInit {
 
    ngOnInit(): void { }

    
  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
}

}
