import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { SpinnerManualModule } from 'src/app/shared/core/common/spinner/spinner-manual.module';
import { RouterModule } from '@angular/router';
import { EmailManagerComponent } from './email-manager.component';
import { PrepareBatchComponent } from './prepare-batch/prepare-batch.component';
import { MailCampaignTextService } from './email-manager.service';
import { BatchDetailsComponent } from './batch-details/batch-details.component';
import {  resumeListComponent } from './resume-list/resume-list.component';
import { PreviewFileComponent } from './preview-file/preview-file.component';
import { CareersService } from 'src/app/home/careers/careers.service';
import { ContactModule } from 'src/app/home/contact/contact.module';
import { JobsModule } from 'src/app/home/careers/jobs/jobs.module';
import { ContactTestComponent } from './contact-test/contact-test.component';


@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    CommonModule,
    ContactModule,
    JobsModule,
    FormsModule,
    SpinnerManualModule,
    RouterModule.forChild([
        {
          path: '',
          component: EmailManagerComponent
        }
  
      ])
  ],
  declarations: [
    EmailManagerComponent,
    PrepareBatchComponent,
    BatchDetailsComponent,
    resumeListComponent,
    ContactTestComponent
    // PreviewFileComponent
    // ApplicantListingComponent
  ],
  exports: [
    EmailManagerComponent,
    PrepareBatchComponent,
    BatchDetailsComponent,
    resumeListComponent,
    // PreviewFileComponent

    // ApplicantListingComponent
  ],
  providers: [MailCampaignTextService,CareersService],
})
export class EmailManagerModule { }
