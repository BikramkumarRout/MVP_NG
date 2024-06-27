import { Component, OnInit } from '@angular/core';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';

@Component({
    selector: 'selector-home-locations',
    templateUrl: './locations.component.html',
    styleUrls: ['./locations.component.css']
})

export class LocationsComponent implements OnInit {
 
    mapLocation: any;
    showMap: boolean = false;
    mapUrl: any;

    constructor(
 
        private safePipe: SafePipe
      ) {
    
      }

    ngOnInit(): void { 
    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
