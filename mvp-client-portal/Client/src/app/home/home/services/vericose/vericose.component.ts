import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-vericose',
    templateUrl: './vericose.component.html',
})

export class VericoseComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
    
}
