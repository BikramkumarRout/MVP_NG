import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-joel-wolf',
    templateUrl: './joel-wolf.component.html',
})

export class JoelwolfComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
