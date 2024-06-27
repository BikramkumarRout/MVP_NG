import { Component, Inject, OnInit, isDevMode } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { Subject } from 'rxjs';
import * as $ from 'jquery';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { ShareDataService } from './shared/core/common/sharedDataService';
import { ProviderService } from './providers/provider.service';
import { LocationService } from './home/locations/locations.service';
import { Session } from 'protractor';
import { SwUpdate } from '@angular/service-worker';
//import { SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  pageTitle = '';
  loading = true;
  update: boolean = false;
  isIframe = false;
  loginDisplay = false;
  locations: any;
  private readonly _destroying$ = new Subject<void>();
  currentUser: any;
  isProviderExist: boolean = true;
  displayHomeTopBar: boolean = true;
  app: any;
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService, private sharedDataService: ShareDataService, private locationService: LocationService,
    private router: Router, private messageService: MessageService, private providerService: ProviderService,
    //@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalAuthService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private readonly updates: SwUpdate) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
      if (routerEvent instanceof NavigationEnd) {
        this.setTopMenu();
      }

    });
    this.updates.available.subscribe(event => {
      this.showAppUpdateAlert();
    });
  }

  showAppUpdateAlert() {
    const header = 'App Update available';
    const message = 'Choose Ok to update';
    const action = this.doAppUpdate;
    const caller = this;
    this.doAppUpdate();
    // Use MatDialog or ionicframework's AlertController or similar

  }

  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }

  ngOnInit() {
    // this.msalBroadcastService.inProgress$
    // .pipe(
    //   filter((status: InteractionStatus) => status === InteractionStatus.None),
    // )
    // .subscribe(() => {
    //   this.authService.logout();
    // }) 
    //window.navigator.serviceWorker.register('https://localhost:4200/service-worker.js')
    // if (this.swUpdate.isEnabled) {

    //   this.swUpdate.available.subscribe(() => {

    //       if(confirm("New version available. Load New Version?")) {

    //           window.location.reload();
    //       }
    //   });
    // }       

    // if(window.navigator && navigator.serviceWorker) {
    //   navigator.serviceWorker.getRegistrations()
    //   .then(function(registrations) {
    //     for(let registration of registrations) {
    //       registration.unregister();
    //     }
    //   });
    // }

    // console.log(environment.version);   
    // console.log(location.origin);  

    if (location.origin === 'https://mvpmedgroup.com') {
      window.location.href = location.href.replace('https://mvpmedgroup.com', 'https://www.mvpmedgroup.com');
    } else if (location.origin === 'https://portal.mvpmedgroup.com') {
      window.location.href = location.href.replace('https://portal.mvpmedgroup.com', 'https://www.mvpmedgroup.com');
    }
    else if (location.origin === 'http://portal.mvpmedgroup.com') {
      window.location.href = location.href.replace('http://portal.mvpmedgroup.com', 'https://www.mvpmedgroup.com');
    }
    console.log(window.location.href);
    this.currentUser = this.sharedDataService.getUserValue();
    if (this.authService.currentUser) {
      this.setProviderMenu();
    }
    this.locationService.getLocations().subscribe(
      response => {
        let resp: any = response;
        this.locations = resp.result;
      });
    //this.setTopMenu();
  }

  setTopMenu() {
    let currentUrl = this.router.url;
    //console.log(currentUrl);
    if (currentUrl == '/' || currentUrl.indexOf('home') != -1 || currentUrl.indexOf('careers') != -1 || 
    currentUrl.indexOf('login') != -1 || currentUrl.indexOf('two-step-verification') != -1 || 
    currentUrl.indexOf('verify-email') != -1 || currentUrl.indexOf('forgot-password') != -1 || 
    currentUrl.indexOf('send-code') != -1 || currentUrl.indexOf('privacy-policy') != -1) {
      this.displayHomeTopBar = true;
    }
    else {
      this.displayHomeTopBar = false;
    }
  }


  setProviderMenu() {
    this.providerService.isProviderExist(null, null, null, null, null).subscribe(res => {
      this.isProviderExist = res.result.isProviderExist;
    })
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
