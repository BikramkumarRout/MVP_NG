import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeadershipTeamModule } from '../leadership-team/leadershipteam.module';
import { WhoweareComponent } from './whoweare.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    LeadershipTeamModule,
    RouterModule.forChild([
      {
        path: 'who-we-are',
        component: WhoweareComponent
      },
    ]),
  ],
  declarations: [
    WhoweareComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class WhoweareModule { }
