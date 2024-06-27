import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.css']})

export class PrivacyPolicyComponent implements OnInit {
    public portalFooter: boolean = true;
    ngOnInit(): void { }
    
    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
