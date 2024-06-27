import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamComponent } from './team.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'team',
        component: TeamComponent
      },
    ]),
  ],
  declarations: [
    TeamComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class TeamModule { }
