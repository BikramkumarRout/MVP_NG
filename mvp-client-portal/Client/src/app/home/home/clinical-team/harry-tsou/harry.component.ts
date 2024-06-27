import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-harry-halpert',
    templateUrl: './harry.component.html',
})

export class HarryComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit(): void {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
