import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.css']})

export class DefaultComponent implements OnInit {
    public portalFooter: boolean = true;
    ngOnInit(): void { }
    
    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
