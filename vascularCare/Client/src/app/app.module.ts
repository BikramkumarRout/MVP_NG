import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
/* Feature Modules */
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';
import { SharedModule } from './shared/shared.module';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { MvpPaginationModule } from './shared/pagination/mvp-pagination.module';
import { LocationComponent } from './location/location.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ShareDataService } from './shared/core/common/sharedDataService';
import { HomeTopBarComponent } from './layout/home-topbar.component';
import { HomeComponent } from './home/home.component';
import { MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { AppConsts } from './shared/core/common/app-constant';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PreviewFileComponent } from './manage-site/email-manager/preview-file/preview-file.component';
import { NgxCaptchaModule } from '@binssoft/ngx-captcha';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: AppConsts.azyreAd.clientId,
      authority: AppConsts.azyreAd.authority,
      redirectUri: AppConsts.azyreAd.redirectUri,
      postLogoutRedirectUri: AppConsts.azyreAd.redirectUri,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11

    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

@NgModule({
    imports: [
        NgxCaptchaModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        UserModule,
        MessageModule,
        AppRoutingModule,
        SharedModule.forRoot(),
        MvpPaginationModule.forRoot(),
        ServiceWorkerModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }) //need to disable for dev mode for pwa
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LocationComponent,
    ],
    exports: [
        LocationComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: MSAL_INSTANCE,
            useFactory: MSALInstanceFactory
        },
        MsalService,
        MsalGuard,
        MsalBroadcastService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        LocationComponent,
        ShareDataService
    ]
})

export class AppModule { }
