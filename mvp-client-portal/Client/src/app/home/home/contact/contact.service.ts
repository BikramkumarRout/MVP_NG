import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConsts } from '../../shared/core/common/app-constant';

import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';


@Injectable()
export class ContactService {
  constructor(private http: HttpClient) { }

//   login(model: AuthenticateModel): Observable<any> {
//     return this.http.post(AppConsts.apiUrl.login, model, AppConsts.httpOptions);

//   }

  contactUs(model): Observable<any>{
    let url_ = AppConsts.apiUrl.contactUs;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }


}