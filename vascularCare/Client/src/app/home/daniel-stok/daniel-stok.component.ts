import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-daniel',
    templateUrl: './daniel-stok.component.html',
})

export class DanielStokComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
