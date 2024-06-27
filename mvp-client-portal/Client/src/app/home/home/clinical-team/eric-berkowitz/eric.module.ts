import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { EricComponent } from './eric.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'clinical-team/eric-berkowitz',
        component: EricComponent
      },
    ]),
  ],
  declarations: [
    EricComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class EricModule { }
