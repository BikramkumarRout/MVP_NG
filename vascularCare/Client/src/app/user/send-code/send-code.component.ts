import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { NotifyService } from 'src/app/shared/core/common/toast/toast.service';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

import { SendCodeDto } from './send-code';


@Component({
    selector: 'send-code',
    templateUrl: './send-code.component.html',
    styleUrls: ['./send-code.component.css']
})

export class SendCodeComponent implements OnInit {
    displaySendCode:boolean=true;
    // @Output() displayChange = new EventEmitter();

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
    levelOfService = 1;
    public sendCodeDto: SendCodeDto;

    constructor(private authService: AuthService, private router: Router, private dashboardService: DashboardService,
        private loginService: LoginService, private sharedDataService: ShareDataService, private notify: NotifyService,
        private msalAuthService: MsalService,) { }

    ngOnInit() {
        this.loginFormModel();
        // this.authService.logout();
        this.currentUser = this.sharedDataService.getUserValue();
        this.sendCodeDto = new SendCodeDto();


    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

    selected(event) {
        if (this.levelOfService != 1) {
            alert('Coming soon!')
        }
    }
    sendCode() {
        this.sendCodeDto.userId = this.currentUser.id;
        this.sendCodeDto.provider =  this.levelOfService;
        this.loginService.twoStepSendCode(this.sendCodeDto).subscribe(res => {
            this.router.navigateByUrl('/two-step-verification');
        })
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

    onClose() {
        this.displaySendCode=false;
        this.router.navigateByUrl('/login');

      }
}
