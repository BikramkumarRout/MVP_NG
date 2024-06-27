import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClinicalTeamService } from '../clinical-team/clinical-team.service';
import { BioDetailsModule } from './bio-details/bio-details.module';
import { ClinicalTestComponent } from './clinical-test.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    BioDetailsModule,
    RouterModule.forChild([
      {
        path: 'clinical-test',
        component: ClinicalTestComponent
      },
    ]),
  ],
  declarations: [
    ClinicalTestComponent
  ],
  exports: [

  ],
  providers: [
    ClinicalTeamService
  ],

})
export class ClinicalTestModule { }