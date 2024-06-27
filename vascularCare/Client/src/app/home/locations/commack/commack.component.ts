import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-commack',
    templateUrl: './commack.component.html',
    styleUrls: ['./commack.component.css']
})

export class CommackComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

}
