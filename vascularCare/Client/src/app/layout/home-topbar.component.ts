import { AfterViewInit, Component, ElementRef, Injector, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { AuthenticateModel } from '../user/login';
import { AppConsts } from '../shared/core/common/app-constant';
import { LoginService } from '../user/login.service';
import { CommonService } from '../shared/core/common/commonService';
import { ShareDataService } from '../shared/core/common/sharedDataService';

@Component({
  templateUrl: './home-topbar.component.html',
  selector: 'home-topbar',
  styleUrls: ['./home-topbar.component.css'],
  
  encapsulation: ViewEncapsulation.None
})
export class HomeTopBarComponent implements OnInit {
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('jobActive', { static: false }) careerTab: ElementRef;
  @Input() locations: any;
  user: any;
  firstName: any;
  flName: any;
  firstLastName: any;
  role: any;
  IsLogin: any;
  loginDisplay: boolean;
  isClientPortalHide: boolean;
  adUser: any;
  isHr: any;
  loading: boolean;
  currentUrl: string;
  clientPortalDisable: boolean;
  

  constructor(
    injector: Injector,
    private authService: AuthService,
    private router: Router,
    private msalAuthService: MsalService,
    private loginService: LoginService,
    private commonService: CommonService,
    private shareDataService: ShareDataService,
    
  ) {
    
    router.events.subscribe((routerEvent) => {
      this.checkRouterEvent(routerEvent);
      if (routerEvent instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
        if (this.currentUrl === '/careers/jobs') {
          this.careerTab.nativeElement.classList.add('careerActive');
        }else{
          this.careerTab.nativeElement.classList.remove('careerActive');
        }
      }

    });
    router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd ) {
        this.currentUrl = routerEvent.url;
        if(this.currentUrl === '/send-code'){
          this.clientPortalDisable=true;
        }
    
          else if(this.currentUrl === '/two-step-verification'){
            this.clientPortalDisable=true;
          }else{
            this.clientPortalDisable=false;
    
          }
        
      }
    });
    
    
  }
  ngOnInit() {
    this.loginDisplay = this.msalAuthService.instance.getAllAccounts().length > 0;
    this.user = this.shareDataService.getUserValue();
    // this.user = this.authService.currentUser;
    if (this.user) {
      this.IsLogin = true;
    }
    
   
  }
  toggleMenu() {
    this.menu.nativeElement.click();
}
  checkRouterEvent(routerEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }
  


  // ngOnDestroy(): void {

  // }

  // getFacilityInfo() {
  //   this.adUser =  sessionStorage.getItem("user");
  //   console.log(this.adUser.role);
  //   if(this.adUser.role === "HR Resume Manager")
  //   this.isClientPortalHide = true;
  // }

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
    sessionStorage.clear();
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }

  onHomeClick() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {         
      if (user.role) {
        this.router.navigateByUrl(user.landingPagePath);
      }else if(user){
        this.router.navigateByUrl('/login');
      }
      else {
        this.router.navigateByUrl('/login');
      }
    } else{
      this.router.navigateByUrl('/login');
    }
  }

  onLogin() {
    if (this.user) {
      this.router.navigateByUrl('/dashboard');
    }
  }

}
