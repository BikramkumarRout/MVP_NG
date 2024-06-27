import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-michelle',
    templateUrl: './michelle-misiti-kenney.component.html',
})

export class MichelleMisitiKenneyComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
