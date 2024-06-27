import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-murat-cosar',
    templateUrl: './murat.component.html',
})

export class MuratComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit(): void {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
