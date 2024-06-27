import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-iftikhar-ahmad',
    templateUrl: './iftikhar.component.html',
})

export class IftikharComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit(): void {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
