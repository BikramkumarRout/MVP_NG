import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingService } from '../setting.service';
import { ResetPasswordComponent } from './reset-password.component';





@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: ResetPasswordComponent

      },
    ]),
  ],
  declarations: [
    ResetPasswordComponent
  ],
  exports: [
    ResetPasswordComponent
  ],
  providers: [
    SettingService
  ],

})
export class ResetPasswordModule { }