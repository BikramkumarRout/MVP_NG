import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmineCosarComponent } from './emine-cosar.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'emine-cosar',
        component: EmineCosarComponent
      },
    ]),
  ],
  declarations: [
    EmineCosarComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class EmineCosarModule { }
