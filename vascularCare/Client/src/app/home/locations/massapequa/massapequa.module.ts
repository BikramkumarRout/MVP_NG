import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { MassapequaComponent } from './massapequa.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'massapequa',
        component: MassapequaComponent
      },
    ]),
  ],
  declarations: [
    MassapequaComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class MassapequaModule { }
