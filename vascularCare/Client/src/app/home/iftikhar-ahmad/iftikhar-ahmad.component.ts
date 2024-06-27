import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-iftikhar',
    templateUrl: './iftikhar-ahmad.component.html',
})

export class IftikharAhmadComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
