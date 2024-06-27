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

@NgModule({
  imports: [
    SharedModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
      { path: 'terms-condition', component: TermsConditionComponent }
    ])
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    TermsConditionComponent
  ],
  exports: [
    TermsConditionComponent
  ],
  providers: [
    LoginService
  ]
})
export class UserModule { }
