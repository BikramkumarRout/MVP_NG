import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-pelvic-congestion-syndrome',
    templateUrl: './pelvic-congestion-syndrome.component.html',
    styleUrls: ['./pelvic-congestion-syndrome.component.css']
})

export class PelvicCongestionSyndromeComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

}
