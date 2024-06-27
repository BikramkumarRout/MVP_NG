import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
 import * as signalR from '@microsoft/signalr';
import { Subscription } from 'rxjs';
import { ProviderService } from 'src/app/providers/provider.service';
import { environment } from 'src/environments/environment';
import { ShareDataService } from '../sharedDataService';



const ACTIVE_CLASS = 'is-active';

@Component({
  selector: 'facility-selector',
  templateUrl: './facilty.component.html',
  styleUrls: ['./facility.component.css']
})

export class FacilityComponent implements  OnInit {
  facilityInfo: any;
  facilities: any;
  facilityId: any;
  selectedFacilityName: any;
  @Output() facilityEmit: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private sharedDataService: ShareDataService,
  private  providerService: ProviderService) { }
  ngOnInit() {
    this.getFacilityInfo();
    this.getRole();
    this.facilityId = this.sharedDataService.getSelectedFacilityId();
    this.selectedFacilityName = this.sharedDataService.getSelectedFacilityName();
    //Working on dev site after need to fix it here

//     const connection = new signalR.HubConnectionBuilder()  
//     .configureLogging(signalR.LogLevel.Information)  
//     .withUrl(environment.appServiceURL + '/facilityNotify')  
//     .build();  
//     let service = this;

//    let isConnection = this.sharedDataService.getFacilityValue();
//    if(isConnection == false)
//    {
    
//   connection.start().then(function () {      
   
//     service.sharedDataService.setFacilityValue(true);

    
    
//   }).catch(function (err) {  
//     connection.stop();
//     return console.error(err.toString());  
//   });  
// }


//   connection.on("BroadcastMessage", (res) => {        
//     service.sharedDataService.setFacilityValue(false); 
//     this.updateFacilityDropdownValues(res);
//     connection.stop();
//   });
  }

  updateFacilityDropdownValues(facilities: any): void {
    let facilityInfo = this.sharedDataService.getSecurityObject();
   facilityInfo.facilities = facilities;
   sessionStorage.setItem('securityObject', JSON.stringify(facilityInfo));
   this.sharedDataService.setSecurityObject(facilityInfo);
   var item = facilities.filter(item => item.facilityId == this.sharedDataService.getSelectedFacilityId());
   //console.log("here" + sessionStorage.getItem("selectedFacilityId"));
   //console.log(item);
   if (typeof item == 'undefined' || item.length == 0) {
     sessionStorage.setItem("selectedFacilityId", facilities[0].facilityId);
     this.sharedDataService.setSelectedFacilityId(facilities[0].facilityId);
     this.sharedDataService.setSelectedFacilityName(facilities[0].name);
     sessionStorage.setItem("selectedFacilityName", facilities[0].name);
   }
}

  getFacilityId(facility) {
    this.facilityId = facility.facilityId;
    this.selectedFacilityName = facility.name;
    sessionStorage.setItem("selectedFacilityId", facility.facilityId);
    this.sharedDataService.setSelectedFacilityId(facility.facilityId);
    this.sharedDataService.setSelectedFacilityName(facility.name);

    sessionStorage.setItem("selectedFacilityName", facility.name);
    this.providerService.isProviderExist(null, null, null, null, null).subscribe(res => {
      let facilityObj = {facilityId: this.facilityId, isProviderExist: res.result.isProviderExist}
      this.facilityEmit.emit(facilityObj);
    })
  }

  getFacilityInfo() {
    this.facilityInfo = this.sharedDataService.getSecurityObject();

    this.facilities = this.facilityInfo.facilities;
    this.facilityId = this.facilities[0].facilityId;
    this.selectedFacilityName = this.facilities[0].name;
  }

  getRole() {
    let user = this.sharedDataService.getUser();
    this.selectedFacilityName = this.sharedDataService.getSelectedFacilityName();
  }
  
}
