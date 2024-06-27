import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-uterine-fibroids',
    templateUrl: './uterine-fibroids.component.html',
    styleUrls: ['./uterine-fibroids.component.css']
})

export class UterineFibroidsComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
