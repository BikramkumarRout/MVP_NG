import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-home-hemorrhoidal',
    templateUrl: './hemorrhoidal.component.html',
})

export class HemorrhoidalComponent implements OnInit {
 
    ngOnInit(): void { }

    
  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
}

}
