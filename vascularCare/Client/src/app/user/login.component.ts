import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from '../shared/core/common/toast/toast.service';
import { sha256 } from 'js-sha256';
import { AuthService } from './auth.service';
import { AuthenticateModel } from './login';
import { LoginService } from './login.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { ShareDataService } from '../shared/core/common/sharedDataService';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  display: boolean;
  errorMessage: string;
  pageTitle = 'Log In';
  userName: any;
  submitted: boolean;
  loginForm: any = {};
  errors: any = {};
  UserEmail: any = '';
  UserPwd: any = '';
  securityObject: any;
  emailIdMsg: string = '';
  loginBtn: boolean = true;
  passwordMsg: string = '';
  public submittedError: boolean;
  public invalidCredential: boolean;
  allowDashboard: any;
  userId: any;
  user: any;
  isUser: any;
  currentUser: any;
  isHr: any;
  displaySendCode:boolean;
  constructor(private authService: AuthService, private router: Router, private dashboardService: DashboardService,
    private loginService: LoginService, private sharedDataService: ShareDataService, private notify: NotifyService,
    private msalAuthService: MsalService,) { }

  ngOnInit() {
    this.loginFormModel();
    // this.authService.logout();
    this.currentUser = this.sharedDataService.getUserValue();

  }

  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
  }

  showDialog() {
    if (!this.submittedError && !this.invalidCredential) {
      this.display = true;
      this.allowDashboard = true;
    } else {
      this.display = false;
    }

  }

  onDialogClose(event) {
    this.display = event;
    this.displaySendCode= event;
  }

  

  login(loginForm: NgForm) {
    sessionStorage.clear();
    // if(!(this.msalAuthService.instance.getAllAccounts().length > 0))
    // {
    //   localStorage.clear();
    // }
    if (!loginForm.valid) {
      this.submittedError = true;
      return;
    }
    this.submittedError = false;
    if (loginForm && loginForm.valid) {
      var hashPwd = this.sharedDataService.encryptData(loginForm.form.value.password);
      let model = new AuthenticateModel();
      model.userNameOrEmailAddress = loginForm.form.value.userName;
      model.password = hashPwd;
      this.loginService.login(model).subscribe((res) => {
        if (res.result.encryptedAccessToken == null) {
          this.invalidCredential = true;
        }
        else {
          // this.router.navigateByUrl('/two-step-verification');
          // this.authService.setLocalStorage(res.result);
          this.showSendCodeDialog();
          this.sharedDataService.setSecurityObjValue(res.result);
          // this.showSendCodeDialog();
          // //let result = this.decrypt(AppConsts.encryptionDecryption.key, res.result.encryptedPassword);
          // this.invalidCredential = false;
          // this.authService.setLocalStorage(res.result);
          // this.allowDashboard = true;
          //   if (res.result.isAcceptTerm) {
          //     this.router.navigate([res.result.landingPagePath]);
          //   }
          
        }
        if (!res.result.isAcceptTerm) {
          this.showDialog();  
      }
        
      });
      // if (this.authService.redirectUrl) {
      //   this.router.navigateByUrl(this.authService.redirectUrl);
      // } else {
      //   this.router.navigate(['/dashboard']);
      // }
    }
  }

  showSendCodeDialog() {
    this.displaySendCode=true;
  }

  private loginFormModel() {
    this.loginForm = {
      userName: '',
      password: ''
    }
  }

  navigateTo() {
    this.router.navigate(['/verify-email']);
  }

  logOut(): void {
    this.router.navigateByUrl('/login');
  }
}
