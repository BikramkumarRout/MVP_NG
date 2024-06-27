import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxCaptchaModule } from '@binssoft/ngx-captcha';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { CaptchaModule } from '../captcha/captcha/captcha.module';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ContactDetailService } from '../contact-details/contact-details.service';
import { HomeModule } from '../home.module';
import { LocationsModule } from '../locations/locations.module';
import { ContactComponent } from './contact.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    LocationsModule,
    CaptchaModule,
    // NgxCaptchaModule,
    RouterModule.forChild([
      {
        path: 'contact',
        component: ContactComponent
      },
    ]),
  ],
  declarations: [
    ContactComponent,
    ContactDetailsComponent,

  ],
  exports: [
    ContactDetailsComponent

  ],
  providers: [
    ContactDetailService,
  ],

})
export class ContactModule { }
