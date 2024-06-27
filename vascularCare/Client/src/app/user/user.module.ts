import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

import { SharedModule } from '../shared/shared.module';
import { LoginService } from './login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { TermsConditionComponent } from './terms&condition/terms-condition.component';
import { SendCodeComponent } from './send-code/send-code.component';
import { TwoStepVerificationComponent } from './twostep-verification/twostep-verification.component';
import { SpinnerManualModule } from '../shared/core/common/spinner/spinner-manual.module';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    ReactiveFormsModule,
    SpinnerManualModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
      { path: 'terms-condition', component: TermsConditionComponent },
      { path: 'send-code', component: SendCodeComponent },
      { path: 'two-step-verification', component: TwoStepVerificationComponent }
    ])
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    TermsConditionComponent,
    SendCodeComponent,
    TwoStepVerificationComponent
  ],
  exports: [
    TermsConditionComponent,
    // SendCodeComponent,
    // TwoStepVerificationComponent
  ],
  providers: [
    LoginService
  ]
})
export class UserModule { }
