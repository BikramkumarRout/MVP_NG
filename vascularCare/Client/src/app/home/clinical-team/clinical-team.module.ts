import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeadershipTeamModule } from '../leadership-team/leadership-team.module';
import { ClinicalTeamComponent } from './clinical-team.component';
import { ClinicalTeamService } from './clinical-team.service';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    LeadershipTeamModule,
    RouterModule.forChild([
      {
        path: 'clinical-team',
        component: ClinicalTeamComponent
      },
    ]),
  ],
  declarations: [
    ClinicalTeamComponent
  ],
  exports: [

  ],
  providers: [
    ClinicalTeamService
  ],

})
export class ClinicalTeamModule { }