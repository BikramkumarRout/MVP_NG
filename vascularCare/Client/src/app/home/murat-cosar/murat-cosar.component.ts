import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-murat',
    templateUrl: './murat-cosar.component.html',
    styleUrls: ['./murat-cosar.component.css']
})

export class MuratCosarComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
