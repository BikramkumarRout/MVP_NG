import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
 selector: 'read-more',
 templateUrl: './read-more.component.html', 
    styles: [`
        div.collapsed {
            overflow: hidden;
        }
    `]
})
export class ReadMoreComponent implements AfterViewInit {

 //the text that need to be put in the container
    @Input() text: string;

    //maximum height of the container
    @Input() maxHeight: number = 10;

    //set these to false to get the height of the expended container 
    public isCollapsed: boolean = false;
    public isCollapsable: boolean = false;

    constructor(private elementRef: ElementRef, private cdRef:ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        let currentHeight = this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
       //collapsable only if the contents make container exceed the max height
        if (currentHeight > this.maxHeight) {
            this.isCollapsed = true;
            this.isCollapsable = true;
            this.cdRef.detectChanges();
        }
    }

}