import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConsts } from '../shared/core/common/app-constant';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';

@Injectable()
export class SettingService {
  constructor(private http: HttpClient) {
  }

  resetPassword(model): Observable<any>{
    let url_ = AppConsts.apiUrl.resetPassword;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }



}
