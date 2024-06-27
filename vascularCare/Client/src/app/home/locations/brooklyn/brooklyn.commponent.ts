import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-brooklyn',
    templateUrl: './brooklyn.component.html',
    styleUrls: ['./brooklyn.component.css']
})

export class BrooklynComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

}
