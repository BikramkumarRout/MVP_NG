import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-queens',
    templateUrl: './queens.component.html',
    styleUrls: ['./queens.component.css']
})

export class QueensComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

}
