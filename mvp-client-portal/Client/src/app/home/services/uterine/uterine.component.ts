import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-uterine',
    templateUrl: './uterine.component.html',
})

export class UterineComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
    
}
