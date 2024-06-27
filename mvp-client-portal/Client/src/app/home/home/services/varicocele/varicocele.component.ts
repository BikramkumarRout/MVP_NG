import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-varicocele',
    templateUrl: './varicocele.component.html',
})

export class VaricoceleComponent implements OnInit {
 
    ngOnInit(): void { }

    
  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
}

}
