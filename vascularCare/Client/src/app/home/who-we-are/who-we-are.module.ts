import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeadershipTeamModule } from '../leadership-team/leadership-team.module';
import { WhoWeAreComponent } from './who-we-are.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    LeadershipTeamModule,
    RouterModule.forChild([
      {
        path: 'who-we-are',
        component: WhoWeAreComponent

      },
    ]),
  ],
  declarations: [
    WhoWeAreComponent

  ],
  exports: [

  ],
  providers: [

  ],

})
export class WhoWeAreModule { }
