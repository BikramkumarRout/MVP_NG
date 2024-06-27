import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-rockland',
    templateUrl: './rockland.component.html',
    styleUrls: ['./rockland.component.css']
})

export class RocklandComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

}
