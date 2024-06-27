import { Component, Injector, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { UserDto } from 'src/app/manage-site/manage-user/manage-user';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AuthService } from 'src/app/user/auth.service';
import { AuthenticateModel } from 'src/app/user/login';
import { LoginService } from 'src/app/user/login.service';


@Component({
  templateUrl: './footer.component.html',
  selector: 'common-footer',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
  @Input() portalFooter;
  loginDisplay: boolean;
  public userDetail: UserDto;
  name: any;
  userEmail: any;
  currentUser: any;
  isHr: any;

  constructor(private sharedDataService: ShareDataService, private loginService: LoginService, private commonService: CommonService, private msalAuthService: MsalService, private router: Router, private authService: AuthService) {
    window.addEventListener("scroll", this.backToTop.bind(this));
    this.backToTop();
  }

  ngOnInit() {
    this.loginDisplay = this.msalAuthService.instance.getAllAccounts().length > 0;
    let result = this.msalAuthService.instance.getAllAccounts();
    this.userDetail = new UserDto();
    this.currentUser = this.sharedDataService.getUserValue();

  }

  ngViewAfterInIt() {
    // alert('this is afterViewInIt');
  }


  backToTop() {
    var backTop = $('#back-to-top');
    var scrollTrigger = 200;
    var scrollTop = $(window).scrollTop();
    if (scrollTop > scrollTrigger) {
      console.log('backotip')
      backTop.addClass('show');
    } else {
      backTop.removeClass('show');
    }

  }

  backToTopClick(e) {
    e.preventDefault();
    $('html,body').animate({
      scrollTop: 0
    }, 700);
  }
  onLogin() {
    this.msalAuthService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.loginDisplay = true;
      this.msalAuthService.instance.setActiveAccount(response.account);
      //this.authService.setLocalStorage(response.account);
      this.saveInternalUser();

    });

  }

  private saveInternalUser() {
    let model = new UserDto();
    let adInstance = this.msalAuthService.instance.getAllAccounts()[0];
    model.name = adInstance.name
    model.email = adInstance.username;
    model.id = 0;
    model.firstName = '';
    model.lastName = '';
    model.address = '';
    model.phoneNumber = '';
    model.userId = 0;
    model.password = '';
    model.city = '';
    model.zipCode = '';
    model.corporationId = 0;
    model.facilityids = '';
    model.status = 0;
    model.selectedRoleId = '';
    model.userRolename = '';
    model.state = '';
    model.designation = '';
    model.userType = 1;
    this.commonService.saveInternalUser(model).subscribe(res => {
      if (res.result) {
        let model = new AuthenticateModel();
        model.userNameOrEmailAddress = adInstance.username;
        model.password = AppConsts.message.internalUserPassword;
        this.loginService.login(model).subscribe((logInRes) => {
          this.authService.setLocalStorage(logInRes.result);
          const hrCheck = logInRes.result.roleName.split(",");
          this.isHr = hrCheck.includes('HR Resume Manager')

          if (this.isHr) {
            this.sharedDataService.setClientPortalHide(true);

          }
          this.router.navigate([logInRes.result.landingPagePath]);


        });
      }

    });
  }


  logout() {
    // this.msalAuthService.logout();
    window.sessionStorage.clear();
    sessionStorage.clear();
    // if (this.loginDisplay) {
    //   this.msalAuthService.logout();
    // }
    
    localStorage.clear();
    this.authService.logout();
    this.loginDisplay = false;
    this.sharedDataService.setUserValue(null);
    this.router.navigate(['/home']);
  }

}
