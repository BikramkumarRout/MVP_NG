import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConsts } from '../shared/core/common/app-constant';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';

@Injectable()
export class ManageSiteService {
  submitError: Observable<any>;
  public SubmitErrorEmit = new Subject<any>();

 constructor(private http: HttpClient) {
    this.submitError = this.SubmitErrorEmit.asObservable();
  }

  SaveClicked(data) {
    this.SubmitErrorEmit.next(data);
  }

  saveCorporations(model): Observable<any>{
    let url_ = AppConsts.apiUrl.saveCorporation;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  updateCorporations(model): Observable<any>{
    let url_ = AppConsts.apiUrl.updateCorporation;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  getCorporations(): Observable<any>{
    let url_ = AppConsts.apiUrl.getCorporations;
    return this.http.get(url_, AppConsts.httpOptions)
  }

  getUsers(): Observable<any>{
    let url_ = AppConsts.apiUrl.getUsers;
    return this.http.get(url_, AppConsts.httpOptions)
  }

  saveUser(model): Observable<any>{
    let url_ = AppConsts.apiUrl.saveUser;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  updateUser(model): Observable<any>{
    let url_ = AppConsts.apiUrl.updateUser;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  getUserCorporations(): Observable<any>{
    let url_ = AppConsts.apiUrl.getUserCorporations;
    return this.http.get(url_, AppConsts.httpOptions)
  }

  getUserCorporateFacility(corporateId): Observable<any>{
    let url_ = AppConsts.apiUrl.getUserCorporateFacility;
    if (corporateId !== undefined) {
      url_ += 'CorporateId=' + encodeURIComponent('' + corporateId) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions)
  }

  getRoles(): Observable<any>{
    let url_ = AppConsts.apiUrl.getUsers;
    return this.http.get(url_, AppConsts.httpOptions)
  }


}
