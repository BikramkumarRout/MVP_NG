import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-about',
    templateUrl: './about.component.html',
})

export class AboutComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
