import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-services',
    templateUrl: './services.component.html',
})

export class ServicesComponent implements OnInit {
 
    ngOnInit(): void { }

    
  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
}

}
