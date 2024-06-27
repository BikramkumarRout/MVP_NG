import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { SpinnerManualModule } from 'src/app/shared/core/common/spinner/spinner-manual.module';
import { MailCampaginManagementComponent } from './mail-campaign-management.component';
import { MailCampaignManagementRoutingModule } from './mail-campaign-management.routing.module';
import { RouterModule } from '@angular/router';
import { MailCampaignManagementService } from './mail-campaign-management.service';
import { MailCampaignEditComponent } from './mail-campaign-edit/mail-campaign-edit.component';
import { ToEditComponent } from './mail-campaign-edit/to-edit/to-edit.component';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    SpinnerManualModule,
    // MailCampaignManagementRoutingModule
    RouterModule.forChild([
        {
          path: '',
          component: MailCampaginManagementComponent
        }
  
      ])
  ],
  declarations: [
    MailCampaginManagementComponent,
    MailCampaignEditComponent,
    ToEditComponent
  ],
  exports: [
    MailCampaginManagementComponent,
    MailCampaignEditComponent,
    ToEditComponent
  ],
  providers: [MailCampaignManagementService],
})
export class MailCampaignManagementModule { }
