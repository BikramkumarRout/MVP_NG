import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-amir-salem',
    templateUrl: './amir.component.html',
})

export class AmirComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit(): void {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
