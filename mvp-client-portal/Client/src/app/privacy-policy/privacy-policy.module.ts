import { NgModule } from '@angular/core';
import { RadioControlValueAccessor } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PrivacyPolicyComponent } from './privacy-policy.component';



@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: PrivacyPolicyComponent
      }
    ]),
  ],
  declarations: [
    PrivacyPolicyComponent
  ],
  exports: [
    PrivacyPolicyComponent
  ],
  providers: [
   
  ],

})
export class PrivacyPolicyModule { }
