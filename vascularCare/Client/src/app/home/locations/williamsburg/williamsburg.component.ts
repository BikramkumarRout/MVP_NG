import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-williamsburg',
    templateUrl: './williamsburg.component.html',
    styleUrls: ['./williamsburg.component.css']
})

export class WilliamsburgComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

}
