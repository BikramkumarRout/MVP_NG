import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { MuratComponent } from './murat.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'clinical-team/murat-cosar',
        component: MuratComponent
      },
    ]),
  ],
  declarations: [
    MuratComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class MuratModule { }
