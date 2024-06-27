import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { DialogService } from 'primeng/dynamicdialog';
import { LocationComponent } from '../location/location.component';
import { AppConsts } from '../shared/core/common/app-constant';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { DashboardPaging } from './dasboard';
import { NotifyService } from '../shared/core/common/toast';
import { ShareDataService } from '../shared/core/common/sharedDataService';

import { ProviderService } from '../providers/provider.service';
import { CommonService } from '../shared/core/common/commonService';
import { TransportDetailDto } from './transport-detail/transport-detail';
import { AuthService } from '../user/auth.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) el: ElementRef;
  public pageTitle = 'Dashboard';
  public previousDosData: any = [];
  public patientFile;
  public displayTransportPopUp: boolean;
  public files: any;
  public cols: string[];
  public paitentFile: any = '';
  public display: boolean = false;
  public uploadedFile;
  primengTableHelper: any;
  patient: any;
  public dashboardPaging: DashboardPaging;
  public userRole;
  NextDosData: any;
  vccNextDosData: any;
  patientId: any;
  totalCount: any;
  vccTotalCount: any;
  facilityInfo: any;
  facilities: any;
  facilityId: any;
  selectedFacilityName: any;
  nextDosDate: any;
  vccNextDosDate: any;
  todaysDate: any;
  vccTodaysDate: any;
  isChecked = false;
  calledPage = "dos-history";
  isPdf: boolean;
  selectedFile: any;
  pdfExists: any;
  userName: any;
  facilityName: string;
  displayEmit: any;
  dosCategory: any;
  flag: any;
  date: any;
  currentYear;
  currentMonth;
  previousMonth;
  isProviderExist: boolean = true;
  vccPatientData;
  scheduledTime: any;
  public transportDetail: TransportDetailDto;
  displayVcc: any;
  isNextDosData: any;
  isVccData: any;
  public portalFooter: boolean = true;
  isClientPortalHide: any;
  user: any;
  isHr: any;
  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private dialogService: DialogService,
    private http: HttpClient,
    private notify: NotifyService,
    private providerService: ProviderService,
    private sharedDataService: ShareDataService,
    private myService: CommonService,
    private authService: AuthService,
    private shareDataService: ShareDataService
  ) {
    this.dashboardPaging = new DashboardPaging();
  }

  ngOnInit() {
    this.user = this.shareDataService.getUserValue();
    

    this.getFacilityInfo();
    this.setProviderMenu();

   

    
    this.getRole();
    this.onGetNextDos();
    this.transportDetail = new TransportDetailDto();
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

  getFacilityInfo() {
    this.facilityInfo = this.sharedDataService.getSecurityObject();
    this.facilities = this.facilityInfo.facilities;
    this.facilityId = this.facilities[0].facilityId;
    this.selectedFacilityName = this.facilities[0].name;
  }


  onFacilityEmit(facilityObj: any) {
    this.facilityId = facilityObj.facilityId;
    this.isProviderExist = facilityObj.isProviderExist;
    this.onGetNextDos();
    let dataPass = { faclityId: this.facilityId, callBack: this.calledPage }
    this.dashboardService.pageReloadFacilityId(dataPass);
  }

  onSelectReferral(event) {
    if (event.target.checked) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  onGetNextDos() {
    this.dashboardService.getNextDos(this.facilityId).subscribe(nextDosData => {
      this.NextDosData = nextDosData.result.appointment;
      this.isNextDosData = nextDosData.result.totalCount === 0;
      this.totalCount = nextDosData.result.totalCount;
      this.nextDosDate = nextDosData.result?.appointment[0]?.date;
      this.todaysDate = nextDosData.result.isTodayDate;
      this.vccNextDosData = nextDosData.result.vccappointment;
      this.vccTotalCount = nextDosData.result.vccTotalCount;
      this.vccNextDosDate = nextDosData.result?.vccappointment[0]?.date;
      this.vccTodaysDate = nextDosData.result.vccIsTodayDate;
      this.isVccData = nextDosData.result.vccTotalCount === 0;
    })
  }


  navigateToAppointment(): void {
    this.router.navigate(['/appointment']);
  }

  showDialog(value) {
    this.display = true;
    this.patientId = value;
  }
  showVccDialog() {
    this.displayVcc = true;
  }

  onDialogClose(event) {
    this.display = event;
    this.displayTransportPopUp = event;
    this.displayVcc = event;
  }

  show() {
    const ref = this.dialogService.open(LocationComponent, {
      data: {
        id: '51gF3'
      },
      header: 'Vascular Care Center Locations',
      width: '80vw',
      dismissableMask: false,
      transitionOptions: '3ms',
      style: { "position": "relative", "top": "0px" },
      contentStyle: { "overflow": "auto", "height": "550px" },
      baseZIndex: 10000
    });

    ref.onClose.subscribe((result) => {
    });
  }

  getRole() {
    let user = this.sharedDataService.getUser();
    this.userRole = user.mvpRoleType;
    this.userName = user.userName;
    this.facilityName = this.sharedDataService.getSelectedFacilityName();
  }

  showConfirmDialog(value) {
    this.displayTransportPopUp = true;
    this.vccPatientData = value;
    this.getVccDetailTransport();
  }
  getVccDetailTransport() {
    this.facilityId = this.vccPatientData.facilityId;
    this.patientId = this.vccPatientData.patientId;
    this.scheduledTime = this.vccPatientData.date;
    this.dashboardService.getVCCTransportDetail(this.facilityId, this.patientId, this.scheduledTime).subscribe(
      response => {
        // this.listing = response.result;
      });
  }
}
