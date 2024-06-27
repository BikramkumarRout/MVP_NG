import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-massapequa',
    templateUrl: './massapequa.component.html',
    styleUrls: ['./massapequa.component.css']
})

export class MassapequaComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

}
