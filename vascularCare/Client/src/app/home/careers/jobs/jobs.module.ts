import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerManualModule } from 'src/app/shared/core/common/spinner/spinner-manual.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditJobsComponent } from './edit-jobs/edit-jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobDetailsService } from './job-details/job-details.service';
import { JobsComponent } from './jobs.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    SpinnerManualModule,
    RouterModule.forChild([
      {
        path: 'jobs',
        component: JobsComponent
      },
    ]),
  ],
  declarations: [
    JobsComponent,
    JobDetailsComponent,
    EditJobsComponent
  ],
  exports: [
    JobDetailsComponent,
 
  ],
  providers: [
    JobDetailsService
  ],

})
export class JobsModule { }
