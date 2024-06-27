import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { PelvicComponent } from './pelvic.component';
import { HelpFormModule } from 'src/app/home/help-form/help.module';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    HelpFormModule,
    RouterModule.forChild([
      {
        path: 'services/pelvic-congestion-syndrome',
        component: PelvicComponent
      },
    ]),
  ],
  declarations: [
    PelvicComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class PelvicModule { }
