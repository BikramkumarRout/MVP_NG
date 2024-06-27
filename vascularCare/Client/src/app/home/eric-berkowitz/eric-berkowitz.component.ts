import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-eric',
    templateUrl: './eric-berkowitz.component.html',
})

export class EricBerkowitzComponent implements OnInit {
 
    ngOnInit(): void { }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
