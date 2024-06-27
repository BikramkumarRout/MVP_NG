import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { HRComponent } from './hr.component';
import { MailCampaignTextService } from '../email-manager/email-manager.service';
import { SpinnerManualModule } from 'src/app/shared/core/common/spinner/spinner-manual.module';



@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    SpinnerManualModule,
    RouterModule.forChild([
      {
        path: '',
        component: HRComponent
      }

    ])
  ],
  declarations: [
    HRComponent
  ],
  exports: [
    HRComponent

  ],
  providers: [MailCampaignTextService],
})
export class HRListingModule { }
