import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { DanielComponent } from './daniel.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'clinical-team/daniel-stok',
        component: DanielComponent
      },
    ]),
  ],
  declarations: [
    DanielComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class DanielModule { }
