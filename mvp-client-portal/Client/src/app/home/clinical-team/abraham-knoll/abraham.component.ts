import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-abraham-knoll',
    templateUrl: './abraham.component.html',
})

export class AbrahamComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit(): void {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
