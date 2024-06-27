import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClinicalTeamService } from '../clinical-team/clinical-team.service';
import { BioCardDetailsComponent } from './bio-cards/bio-cards.component';
import { LeadershipTeamComponent } from './leadershipteam.component';
 

@NgModule({
  imports: [
    SharedModule.forRoot(),
     
    
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
  ],
  exports: [
    BioCardDetailsComponent
  ],
  providers: [
    ClinicalTeamService
  ],

})
export class LeadershipTeamModule { }
