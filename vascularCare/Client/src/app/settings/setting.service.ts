import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConsts } from '../shared/core/common/app-constant';
import { ExceptionService } from '../shared/core/common/exceptionService';

import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';
import { ResetPasswordDto } from './reset-password/reset-password';


@Injectable()
export class SettingService {
  constructor(private http: HttpClient) {
  }

  resetPassword(model:ResetPasswordDto): Observable<any> {
    let url_ = AppConsts.apiUrl.resetPassword;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }



}
