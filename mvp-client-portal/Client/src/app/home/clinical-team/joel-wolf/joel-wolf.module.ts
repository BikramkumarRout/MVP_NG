import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { JoelwolfComponent } from './joel-wolf.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'clinical-team/joel-wolf',
        component: JoelwolfComponent
      },
    ]),
  ],
  declarations: [
    JoelwolfComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class JoelwolfModule { }
