import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-hemorrhoidal-disease',
    templateUrl: './hemorrhoidal-disease.component.html',
    styleUrls: ['./hemorrhoidal-disease.component.css']
})

export class HemorrhoidalDiseaseComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
