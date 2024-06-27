import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { AbrahamKnollComponent } from './abraham-knoll.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'abraham-knoll',
        component: AbrahamKnollComponent
      },
    ]),
  ],
  declarations: [
    AbrahamKnollComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class AbrahamKnollModule { }
