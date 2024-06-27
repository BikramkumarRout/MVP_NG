import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClinicalTeamComponent } from './clinicalteam.component';

import { AbrahamModule } from './abraham-knoll/abraham.module';
import { DanielModule } from './daniel-stok/daniel.module';
import { EliezerModule } from './eliezer-halpert/eliezer.module';
import { HarryModule } from './harry-tsou/harry.module';
import { EmineModule } from './emine-cosar/emine.module';
import { AmirModule } from './amir-salem/amir.module';
import { EricModule } from './eric-berkowitz/eric.module';
import { IftikharModule } from './iftikhar-ahmad/iftikhar.module';
import { MuratModule } from './murat-cosar/murat.module';
import { JoelwolfModule } from './joel-wolf/joel-wolf.module';
import { LeadershipTeamModule } from '../leadership-team/leadershipteam.module';
import { ClinicalTeamService } from './clinical-team.service';
import { BioDetailsModule } from './bio-details/bio-details.module';
//import { AmirModule } from './amir-salem/amir.module';
//import { AmirModule } from './amir-salem/amir.module';



@NgModule({
  imports: [
    SharedModule.forRoot(),
    AbrahamModule,
    DanielModule,
    EliezerModule,
    HarryModule,
    EmineModule,
    AmirModule,
    EricModule,
    IftikharModule,
    MuratModule,
    JoelwolfModule,
    LeadershipTeamModule,
    BioDetailsModule,
    RouterModule.forChild([
      {
        path: 'clinical-team',
        component: ClinicalTeamComponent
      },

    ]),
  ],
  declarations: [
    ClinicalTeamComponent,
  ],
  exports: [

  ],
  providers: [
    ClinicalTeamService
  ],

})
export class ClinicalTeamModule { }
