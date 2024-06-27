import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-services',
    templateUrl: './services.component.html',
    styleUrls:[ './services.component.css']
})

export class ServicesComponent implements OnInit {
   locationList;
    constructor() {
        
    }

    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
