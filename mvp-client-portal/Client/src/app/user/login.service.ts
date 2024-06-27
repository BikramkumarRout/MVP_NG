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


@Injectable()
export class LoginService {
  constructor(private http: HttpClient,  private exceptionService: ExceptionService) { }

  login(model: AuthenticateModel): Observable<any> {
    return this.http.post(AppConsts.apiUrl.login, model, AppConsts.httpOptions);

  }

  forgotPassword(model): Observable<any>{
    let url_ = AppConsts.apiUrl.forgotPassword;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  verifyEmail(model): Observable<any>{
    let url_ = AppConsts.apiUrl.verifyEmail;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  updateAcceptTermUser(model): Observable<any>{
    let url_ = AppConsts.apiUrl.updateAcceptTermUser;
    return this.http.post(url_,model, AppConsts.httpOptions)
  
  }

}
