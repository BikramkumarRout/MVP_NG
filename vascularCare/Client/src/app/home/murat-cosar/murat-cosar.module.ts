import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MuratCosarComponent } from './murat-cosar.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'murat-cosar',
        component: MuratCosarComponent
      },
    ]),
  ],
  declarations: [
    MuratCosarComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class MuratCosarModule { }