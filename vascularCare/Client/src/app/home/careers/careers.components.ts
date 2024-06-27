import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AuthService } from 'src/app/user/auth.service';

@Component({
    selector: 'pm-careers',
    templateUrl: './careers.component.html',
    styleUrls: ['./careers.component.css']
})

export class CareersComponent implements OnInit {
    loginDisplay: boolean;
    isEditPermission: boolean;

    constructor(private router: Router, private sharedDataService: ShareDataService, private msalAuthService: MsalService, private authService: AuthService) { }
    ngOnInit(): void {
        this.loginDisplay = this.msalAuthService.instance.getAllAccounts().length > 0;
        let result = this.msalAuthService.instance.getAllAccounts();
    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

    navigateTo() {
        this.router.navigate(['/careers/jobs'])
    }


    onLogin() {
        this.msalAuthService.loginPopup().subscribe((response: AuthenticationResult) => {
            this.loginDisplay = true;
            this.msalAuthService.instance.setActiveAccount(response.account);
            this.authService.setLocalStorage(response.account);
        });
    }

    logout() {
        this.msalAuthService.logout();
    }
}
