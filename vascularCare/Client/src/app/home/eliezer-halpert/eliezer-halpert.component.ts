import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-eliezer',
    templateUrl: './eliezer-halpert.component.html',
})

export class EliezerHalpertComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
