import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialysisComponent } from './dialysis.component';
import { HelpFormModule } from 'src/app/home/help-form/help.module';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    HelpFormModule,
    RouterModule.forChild([
      {
        path: 'services/dialysis-access-management',
        component: DialysisComponent
      },
    ]),
  ],
  declarations: [
    DialysisComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class DialysisModule { }
