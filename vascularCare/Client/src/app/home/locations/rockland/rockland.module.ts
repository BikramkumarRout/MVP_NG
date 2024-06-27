import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { RocklandComponent } from './rockland.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'rockland',
        component: RocklandComponent
      },
    ]),
  ],
  declarations: [
    RocklandComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class RocklandModule { }
