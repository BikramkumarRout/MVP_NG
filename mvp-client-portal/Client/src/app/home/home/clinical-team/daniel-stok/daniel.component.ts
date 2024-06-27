import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-daniel-stok',
    templateUrl: './daniel.component.html',
})

export class DanielComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit(): void {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
