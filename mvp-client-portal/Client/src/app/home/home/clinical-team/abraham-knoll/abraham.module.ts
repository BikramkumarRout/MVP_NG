import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { AbrahamComponent } from './abraham.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'clinical-team/abraham-knoll',
        component: AbrahamComponent
      },
    ]),
  ],
  declarations: [
    AbrahamComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class AbrahamModule { }
