import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-emine',
    templateUrl: './emine-cosar.component.html',
    styleUrls: ['./emine-cosar.component.css']
})

export class EmineCosarComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
