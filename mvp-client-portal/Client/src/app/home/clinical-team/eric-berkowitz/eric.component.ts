import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-eric-berkowitz',
    templateUrl: './eric.component.html',
})

export class EricComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit(): void {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
