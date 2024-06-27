import { NgModule } from '@angular/core';
import { RadioControlValueAccessor } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DefaultComponent } from './default.component';



@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: DefaultComponent
      }
    ]),
  ],
  declarations: [
    DefaultComponent
  ],
  exports: [
    DefaultComponent
  ],
  providers: [
   
  ],

})
export class DefaultModule { }
