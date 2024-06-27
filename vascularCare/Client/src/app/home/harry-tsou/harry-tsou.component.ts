import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-harry',
    templateUrl: './harry-tsou.component.html',
})

export class HarryTsouComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}