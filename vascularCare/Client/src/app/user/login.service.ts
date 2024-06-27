import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConsts } from '../shared/core/common/app-constant';
import { ExceptionService } from '../shared/core/common/exceptionService';
import { AuthenticateModel } from './login';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';
import { PasswordDto } from './forgot-password/forgot-password';
import { TermsConditionDto } from './terms&condition/terms-condition';
import { SendCodeDto } from './send-code/send-code';
import { TwostepVerificationDto } from './twostep-verification/twostep-verification';
import { VerifyEmailDto } from './verify-email/verify-email';


@Injectable()
export class LoginService {
  constructor(private http: HttpClient,  private exceptionService: ExceptionService) { }

  login(model: AuthenticateModel): Observable<any> {
    return this.http.post(AppConsts.apiUrl.login, model, AppConsts.httpOptions);

  }

  forgotPassword(model:PasswordDto): Observable<any>{
    let url_ = AppConsts.apiUrl.forgotPassword;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  verifyEmail(model:VerifyEmailDto): Observable<any>{
    let url_ = AppConsts.apiUrl.verifyEmail;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  updateAcceptTermUser(model:TermsConditionDto): Observable<any>{
    let url_ = AppConsts.apiUrl.updateAcceptTermUser;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  twoStepSendCode(model:SendCodeDto) {
    let url_ = AppConsts.apiUrl.twoStepSendCode;

    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  twoStepVerification(model:TwostepVerificationDto) {
    let url_ = AppConsts.apiUrl.twoStepVerification;

    return this.http.post(url_,model, AppConsts.httpOptions)
  }

}
