import { Component, ElementRef, Injector, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
import { AppConsts } from '../shared/core/common/app-constant';
import { CommonService } from '../shared/core/common/commonService';
import { ShareDataService } from '../shared/core/common/sharedDataService';
import { AuthService } from '../user/auth.service';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';

@Component({
  templateUrl: './topbar.component.html',
  selector: 'top-bar',
  styleUrls: ['./topbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent implements OnInit, OnDestroy {
  @Input() isProviderExist: boolean;
  @ViewChild('menu') menu: ElementRef;
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
  loginDisplay: boolean;
  isClientPortalHide: any;
  isHr: any;
  isDashboardVisible: boolean= false;firstTwoLetter: any;
;

  constructor(
    injector: Injector,
    private authService: AuthService,
    private router: Router,
    private dashboardService: DashboardService,
    private sharedService: ShareDataService,
    private myService: CommonService,
    private msalAuthService: MsalService
  ) {

  }

  ngOnInit() {
    this.loginDisplay = this.msalAuthService.instance.getAllAccounts().length > 0;

    if (!this.isProviderExist) {
      this.isProviderExist = true;
    }
    this.getRole();

    if (this.securityObject) {
      if (this.securityObject.designation != null && this.securityObject.designation != "") {
        this.isDesignation = true;
      }
      this.isDashboardVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PagesDashboardView);
      if (this.isDashboardVisible != true) {
        this.isDashboardVisible = this.sharedService.isGrantedPermission(AppConsts.perMissionData.PagesDashboardEdit);
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

  }
  toggleMenu() {
    this.menu.nativeElement.click();
}
  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
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
    // if (this.loginDisplay) {
    //   this.msalAuthService.logout();
    // }
    window.sessionStorage.clear();
    sessionStorage.clear();
    // if (this.loginDisplay) {
    //   this.msalAuthService.logout();
    // }
    
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }

  onHomeClick() {
    sessionStorage.setItem('homeoIconClick', 'HomeIconClick');
    this.router.navigateByUrl('/home');

  }

  getRole() {
    this.securityObject = JSON.parse(sessionStorage.getItem("securityObject"));
    let localUser = JSON.parse(sessionStorage.getItem("user"))
    if (localUser) {
      this.user = localUser.userName;
      this.role = localUser.role;
      this.firstLastName = this.user.split(" ");
      this.firstTwoLetter = this.firstLastName.slice(0, 2);
      this.flName = this.firstLastName.map((name) => name[0]).join('');
      if (this.firstLastName.length == 1) {
        this.firstName = this.user.slice(0, 2);
      } else {
        this.flName = this.firstTwoLetter.map((name) => name[0]).join('');
      }
    }
  }


  onDialogClose(event) {
    this.display = event;
  }

  showDialog() {
    this.display = true;
  }

  onNavigateTo(){
    let user = this.sharedService.getUserValue();
    if(user.mvpRoleType === "SuperUser" || user.userType === 2) {
      this.router.navigateByUrl('/manage-site');

     }else{
      this.router.navigateByUrl(user.landingPagePath) 

     }

  }


}
