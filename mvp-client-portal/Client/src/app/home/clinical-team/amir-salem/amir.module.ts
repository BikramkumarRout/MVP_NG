import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { AmirComponent } from './amir.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'clinical-team/amir-salem',
        component: AmirComponent
      },
    ]),
  ],
  declarations: [
    AmirComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class AmirModule { }
