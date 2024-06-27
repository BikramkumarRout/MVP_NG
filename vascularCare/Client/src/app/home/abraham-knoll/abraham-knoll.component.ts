import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-abraham',
    templateUrl: './abraham-knoll.component.html',
})

export class AbrahamKnollComponent implements OnInit {
 
    ngOnInit(): void { }
    
    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
