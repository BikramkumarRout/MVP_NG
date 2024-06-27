import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';

@Component({
    selector: 'pm-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
    mapUrl: any;
    vccList: any;
    showMap: boolean;
    constructor(
        private commonService: CommonService,
        private safePipe: SafePipe,
      ) {
    
      }
    ngOnInit(): void { 
        let url = 'https://maps.google.com/maps?q=&output=embed';
        this.mapUrl =  this.safePipe.transform(url, 'url'); 
        this.onGetVccFacilities();
    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

    onGetVccFacilities() {
        this.commonService.getVccFacility().subscribe(res => {
          this.vccList = res.result;
        })
      }

    showLocationMap(item) {   
        this.showMap = true;    
        let address:any = item.address;
        let url = "https://maps.google.com/maps?q=" + address + "&output=embed";    
        this.mapUrl =  this.safePipe.transform(url, 'resourceUrl');     
      }
}
