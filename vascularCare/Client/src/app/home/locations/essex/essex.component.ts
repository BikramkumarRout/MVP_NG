import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-essex',
    templateUrl: './essex.component.html',
    styleUrls: ['./essex.component.css']
})

export class EssexComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

}
