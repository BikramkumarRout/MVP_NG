import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-amir',
    templateUrl: './amir-salem.component.html',
})

export class AmirSalemComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}