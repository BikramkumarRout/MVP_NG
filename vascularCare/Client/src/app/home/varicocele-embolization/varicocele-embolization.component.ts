import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-varicocele-embolization',
    templateUrl: './varicocele-embolization.component.html',
    styleUrls: ['./varicocele-embolization.component.css']
})

export class VaricoceleEmbolizationComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
