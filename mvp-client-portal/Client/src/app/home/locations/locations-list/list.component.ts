import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/home/locations/locations.service';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';


@Component({
    selector: 'all-locations-list',
    templateUrl: './list.component.html',
})

export class LocationsListComponent implements OnInit {

    public locations: any;

    mapLocation: any;
    showMap: boolean = false;
    mapUrl: any;
    url: string;
    vccAddress: any;
 
    constructor( private locationService: LocationService, private safePipe: SafePipe) {
    }

    ngOnInit(): void { 

        //this.locations = this.locationService.getLocations();
        this.locationService.getLocations().subscribe(
            response => {
                let resp: any = response;
                this.locations = resp.result;
        });

    }

    
  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
}


    showLocationMap(item) {   
        this.showMap = true;
        let address: any = item.address;
        let name: any= item.name;
        this.vccAddress = item.address.replace('#', '')
        this.url = "https://maps.google.com/maps?q=" + this.vccAddress + name  + "&output=embed";
        this.mapUrl = this.safePipe.transform(this.url, 'resourceUrl');
        console.log(this.mapUrl);   
    }

}
