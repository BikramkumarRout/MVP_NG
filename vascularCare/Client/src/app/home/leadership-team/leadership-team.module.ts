import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReadMoreComponent } from 'src/app/shared/read-more/read-more.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { ClinicalTeamService } from '../clinical-team/clinical-team.service';
import { BioCardDetailsComponent } from './bio-cards/bio-card-details.component';
import { LeadershipTeamComponent } from './leadership-team.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    ReactiveFormsModule,

    RouterModule.forChild([
      {
        path: 'leadership-team',
        component: LeadershipTeamComponent
      },
    ]),
  ],
  declarations: [
    LeadershipTeamComponent,
    BioCardDetailsComponent
    // ReadMoreComponent
  ],
  exports: [
    BioCardDetailsComponent
    // ReadMoreComponent
  ],
  providers: [
    ClinicalTeamService
  ],

})
export class LeadershipTeamModule { }