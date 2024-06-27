import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-westchester',
    templateUrl: './westchester.component.html',
    styleUrls: ['./westchester.component.css']
})

export class WestchesterComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

}
