import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-emine-cosar',
    templateUrl: './emine.component.html',
})

export class EmineComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit(): void {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
