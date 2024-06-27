import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EricBerkowitzComponent } from './eric-berkowitz.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'eric-berkowitz',
        component: EricBerkowitzComponent
      },
    ]),
  ],
  declarations: [
    EricBerkowitzComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class EricBerkowitzModule { }
