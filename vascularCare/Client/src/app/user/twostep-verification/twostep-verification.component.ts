import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { sha256 } from 'js-sha256';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { NotifyService } from 'src/app/shared/core/common/toast/toast.service';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TwostepVerificationDto } from './twostep-verification';
@Component({
    selector: 'two-step-verification',
    templateUrl: './twostep-verification.component.html',
    styleUrls: ['./twostep-verification.component.css']
})
export class TwoStepVerificationComponent implements OnInit {
    @Input() displaySendCode: boolean;
    @Output() displayChangeSendCode = new EventEmitter();
    display;
    errorMessage: string;
    userName: any;
    submitted: boolean;
    loginForm: any;
    errors: any;
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
    interval;
    timeLeft: number = 120;
    verificationCode;
    displaytimer: string = "5";
    intervalId = 0;
    message = '';
    seconds = 11;
    isSuccess: any;
    securityObj: any;
    isSpinnerVisible: boolean;
    timer;
    public twostepVerificationDto: TwostepVerificationDto;

    constructor(private authService: AuthService, private router: Router, private dashboardService: DashboardService,
        private loginService: LoginService, private sharedDataService: ShareDataService, private notify: NotifyService,
        private msalAuthService: MsalService,) {


    }


    ngOnInit() {
        this.securityObj = this.sharedDataService.getSecurityObjValue();
        this.loginFormModel();
        // this.authService.logout();
        // this.currentUser = this.sharedDataService.getUserValue();
        this.startTimer();
        this.twostepVerificationDto = new TwostepVerificationDto();



    }
    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    //   }
    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

    // startTimer() {
    //     this.interval = setInterval(() => {
    //         if (this.timeLeft > 0) {
    //             this.timeLeft--;
    //         } else {
    //             this.timeLeft = 120;
    //         }
    //     }, 1000)

    //     setTimeout(() =>
    //         clearInterval(this.interval)
    //         , 121000);

    // }

    startTimer() {
        let minute = 5;
        let seconds: number = minute * 60;
        let textSec: any = "0";
        let statSec: number = 60;

        const prefix = minute < 10 ? "0" : "";

        this.timer = setInterval(() => {
            seconds--;
            if (statSec != 0) statSec--;
            else statSec = 59;

            if (statSec < 10) {
                textSec = "0" + statSec;
            } else textSec = statSec;

            this.displaytimer = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

            if (seconds == 0) {
                this.onClose();
                console.log("finished");
                clearInterval(this.timer);

            }
        }, 1000);
    }
    onClose() {
        this.displayChangeSendCode.emit(false);
    }

    login() {
        this.isSpinnerVisible = true;
        this.twostepVerificationDto.userId = this.securityObj.userId;
        this.twostepVerificationDto.provider = "1";
        this.twostepVerificationDto.token = this.verificationCode;
        this.loginService.twoStepVerification(this.twostepVerificationDto).subscribe(res => {
            this.isSuccess = res;
            this.isSpinnerVisible = false;
            if (this.isSuccess.result) {
                this.authService.setLocalStorage(this.securityObj);
                if (this.securityObj.isAcceptTerm) {
                    this.router.navigate([this.securityObj.landingPagePath]);
                } else {
                    this.showDialog();
                }

            }
            else {
                this.invalidCredential = true;
                // this.notify.error('Please Enter valid token,which one sent to your email address.');
                // alert("Please login again, Redirecting to Login")
                // this.onClose();
                // this.router.navigate(['/login']);
            }

        })

    }

    showDialog() {

        this.display = true;
        this.allowDashboard = true;


    }

    onDialogClose(event) {
        this.display = event;
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
