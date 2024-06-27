
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-dialysis',
    templateUrl: './dialysis-access-management.component.html',
    styleUrls: ['./dialysis-access-management.component.css']
})

export class DialysisAccessManagementComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
