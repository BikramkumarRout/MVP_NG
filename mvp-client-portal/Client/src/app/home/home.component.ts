import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from 'primeng/dynamicdialog';

import { AppConsts } from '../shared/core/common/app-constant';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { NotifyService } from '../shared/core/common/toast';
import { HomeTopBarComponent } from '../layout/home-topbar.component';
import { LocationService } from './locations/locations.service';

@Component({
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  locations: any;

  constructor(
    private router: Router,


    private http: HttpClient,
    private notify: NotifyService, private locationService: LocationService) {

  }

  ngOnInit() {
    
  }



  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
}


}
