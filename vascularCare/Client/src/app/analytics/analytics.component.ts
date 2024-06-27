import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { ProviderService } from '../providers/provider.service';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';

@Component({
  selector: 'pm-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})

export class AnalyticsComponent implements OnInit {
  public portalFooter: boolean = true;
  facilityId: any;
  facilityInfo: any;
  selectedFacilityName: any;
  facilities: any;
  userRole: any;
  displayEmit: any;
  dosCategory: any;
  flag: any;
  date: any;
  currentMonth: any;
  currentYear: any;
  previousMonth: any;
  calledPage = "dos-history";
  isProviderExist: boolean = true;

  constructor(private dashboardService: DashboardService, private providerService: ProviderService, private sharedDataService: ShareDataService) { }

  ngOnInit(): void {
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
    this.dashboardService.pageReloadFacilityId(dataPass);
  }

  getFacilityInfo() {
    this.facilityInfo = this.sharedDataService.getSecurityObject();
    this.facilities = this.facilityInfo.facilities;
    this.facilityId = this.facilities[0].facilityId;
    this.selectedFacilityName = this.facilities[0].name;
  }

  getRole() {
    let user = this.sharedDataService.getUser();
    this.userRole = user.mvpRoleType;
  }

  displayEmmiter(data) {
    this.displayEmit = data.displayEmit;
    this.dosCategory = data.DosCategory;
    this.flag = data.flag;
    this.date = data.date;
    this.currentMonth = data.currentMonth;
    this.currentYear = data.currentYear;
    this.previousMonth = data.previousMonth;
  }

  onStatDialogClose(event) {
    this.displayEmit = event;
  }
}
