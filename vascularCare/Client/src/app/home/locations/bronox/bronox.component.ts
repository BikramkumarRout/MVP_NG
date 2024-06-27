import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-bronox',
    templateUrl: './bronox.component.html',
    styleUrls: ['./bronox.component.css']
})

export class BronoxComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

}
