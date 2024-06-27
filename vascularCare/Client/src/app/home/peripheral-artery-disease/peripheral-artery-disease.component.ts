import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-peripheral-artery',
    templateUrl: './peripheral-artery-disease.component.html',
    styleUrls: ['./peripheral-artery-disease.component.css']
})

export class PeripheralArteryDiseaseComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
