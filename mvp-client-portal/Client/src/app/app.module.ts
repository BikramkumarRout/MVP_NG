import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
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
import { UrlHandlingStrategy } from '@angular/router';
import { NgxCaptchaModule } from '@binssoft/ngx-captcha';



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
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LocationComponent,
    // HomeComponent

  ],
  exports: [
    LocationComponent,
    // HomeComponent
  ],
  bootstrap: [AppComponent],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy },LocationComponent, ShareDataService],
  entryComponents: [
    LocationComponent
  ]
})

export class AppModule { }
