import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { IftikharAhmadComponent } from './iftikhar-ahmad.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'iftikhar-ahmad',
        component: IftikharAhmadComponent
      },
    ]),
  ],
  declarations: [
    IftikharAhmadComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class IftikharAhmadModule { }
