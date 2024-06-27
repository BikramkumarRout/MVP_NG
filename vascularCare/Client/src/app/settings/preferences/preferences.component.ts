import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-preferences',
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.css']
})

export class PreferencesComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

}
