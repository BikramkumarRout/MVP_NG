import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-eliezer-halpert',
    templateUrl: './eliezer.component.html',
})

export class EliezerComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit(): void {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
