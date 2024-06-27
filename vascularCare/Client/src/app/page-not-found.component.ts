import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from './home/locations/locations.service';

@Component({
  template: `
  <home-topbar  id="customScroll" [locations]="locations"></home-topbar>
<div class="container">

<h1 class="mt-6">This is not the page you were looking for!</h1>
</div>
    `
})
export class PageNotFoundComponent { 
  locations:any;
  constructor( private locationService: LocationService
   ){

    }

    ngOnInit() {
      this.locationService.getLocations().subscribe(
        response => {
          let resp: any = response;
          this.locations = resp.result;
        });
    }
}
