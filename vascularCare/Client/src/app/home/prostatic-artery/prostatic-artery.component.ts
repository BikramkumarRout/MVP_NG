import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-prostatic-artery',
    templateUrl: './prostatic-artery.component.html',
    styleUrls: ['./prostatic-artery.component.css']
})

export class ProstaticArteryComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

}
