import { Component, Injector, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
import { AppConsts } from '../shared/core/common/app-constant';
import { CommonService } from '../shared/core/common/commonService';
import { ShareDataService } from '../shared/core/common/sharedDataService';
import { AuthService } from '../user/auth.service';


@Component({
  templateUrl: './topbar.component.html',
  selector: 'top-bar',
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent implements OnInit, OnDestroy {
  @Input() isProviderExist: boolean;
  user: any;
  firstName: any;
  flName: any;
  firstLastName: any;
  role: any;
  display: any;
  isProvider: any;
  subscription: any;
  isAppointmentVisible = false;
  isPatinetVisible = false;
  isProviderVisible = false;
  isReferAPatientVisible = false;
  isAnalyticsVisible = false;
  isManagesiteVisible: boolean;
  securityObject: any;
  isDesignation: any;

  constructor(
    injector: Injector,
    private authService: AuthService,
    private router: Router,
    private dashboardService: DashboardService,
    private sharedService: ShareDataService,
    private myService: CommonService
  ) {

  }

  ngOnInit() {
    if (!this.isProviderExist) {
      this.isProviderExist = true;
    }
    this.getRole();
    if(this.securityObject.designation != null){
      this.isDesignation = true;
    }


    this.isPatinetVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PagesPatientsView);
    if (this.isPatinetVisible != true) {
      this.isPatinetVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PagesPatientsEdit);
    }
    this.isAppointmentVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PagesAppointmentsView);
    if (this.isAppointmentVisible != true) {
      this.isAppointmentVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PagesAppointmentsEdit);
    }
    this.isProviderVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PagesProviderView);
    if (this.isProviderVisible != true) {
      this.isProviderVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PagesProviderEdit);
    }
    this.isReferAPatientVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PagesReferPatientView);
    if (this.isReferAPatientVisible != true) {
      this.isReferAPatientVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PagesReferPatientEdit);
    }
    this.isAnalyticsVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PageAnalyticsView);
    if (this.isAnalyticsVisible != true) {
      this.isAnalyticsVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PageAnalyticsEdit);
    }
    this.isManagesiteVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PageManageSiteView);
    if (this.isManagesiteVisible != true) {
      this.isManagesiteVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PageManageSiteEdit);
    }


  }
  ngOnDestroy(): void {
    //this.sharedService.events$.unsubscribe();
    //this.subscription.unsubscribe();
    this.myService.myMethod('ddddd');
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }


  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  onHomeClick(){
    this.router.navigateByUrl('/home');

  }

  getRole() {
    this.securityObject = JSON.parse(localStorage.getItem("securityObject"));
    let localUser = JSON.parse(localStorage.getItem("user"))
    this.user = localUser.userName;
    this.role = localUser.role;
    this.firstLastName = this.user.split(" ");
    this.flName = this.firstLastName.map((name) => name[0]).join('');
    if (this.firstLastName.length == 1) {
      this.firstName = this.user.slice(0, 2);
    } else {
      this.flName = this.firstLastName.map((name) => name[0]).join('');
    }
  }

  onDialogClose(event) {
    this.display = event;
  }

  showDialog() {
    this.display = true;
  }

}
