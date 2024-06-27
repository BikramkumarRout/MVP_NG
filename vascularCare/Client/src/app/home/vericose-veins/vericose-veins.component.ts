import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-vericose-veins',
    templateUrl: './vericose-veins.component.html',
    styleUrls: ['./vericose-veins.component.css']
})

export class VericoseVeinsComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
