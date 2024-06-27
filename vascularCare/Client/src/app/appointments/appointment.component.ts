import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../providers/provider.service';
import { ShareDataService } from '../shared/core/common/sharedDataService';
import { AppointmentService } from './appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})

export class AppointmentsComponent implements OnInit {
  public pageTitle = 'Appointment';
  public userRole: any;
  patientId: number;
  facilityInfo: any;
  facilities: any;
  facilityId: any;
  selectedFacilityName: any;
  calledPage = "appointmentDetails";
  isProviderExist: boolean = true;
  public portalFooter: boolean = true;

  constructor(private appointmentService: AppointmentService, private sharedDataService: ShareDataService, private providerService: ProviderService) {
  }

  ngOnInit() {
    this.getFacilityInfo();
    this.getRole();
    this.setProviderMenu();
  }

  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
}

  setProviderMenu() {
    this.providerService.isProviderExist(null, null, null, null, null).subscribe(res => {
      this.isProviderExist = res.result.isProviderExist;
    })
  }


  onFacilityEmit(facilityObj: any) {
    this.facilityId = facilityObj.facilityId;
    this.isProviderExist = facilityObj.isProviderExist;
    let dataPass = { faclityId: this.facilityId, callBack: this.calledPage }
    this.appointmentService.pageReloadFacilityId(dataPass);
  }

  getFacilityInfo() {
    this.facilityInfo =  this.sharedDataService.getSecurityObject();
    this.facilities = this.facilityInfo.facilities;
    this.facilityId = this.facilities[0].facilityId;
    this.selectedFacilityName = this.facilities[0].name;
  }


  getRole() {
    let user =  this.sharedDataService.getUser();
    this.userRole = user.mvpRoleType;
  }

}
