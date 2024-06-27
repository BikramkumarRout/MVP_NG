import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConsts } from '../shared/core/common/app-constant';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';
import { CorporationDto } from './corporations/corporation';
import { UserDto } from './manage-user/manage-user';

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

  saveCorporations(model:CorporationDto): Observable<any>{
    let url_ = AppConsts.apiUrl.saveCorporation;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  updateCorporations(model:CorporationDto): Observable<any>{
    let url_ = AppConsts.apiUrl.updateCorporation;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  getCorporations(): Observable<any>{
    let url_ = AppConsts.apiUrl.getCorporations;
    return this.http.get(url_, AppConsts.httpOptions)
  }
 

  DeleteCorporation(Id: number | null | undefined,
    userId: number | null | undefined
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.deleteCorporation;
    if (Id !== undefined && Id !== null) {
      url_ += 'CorporationId=' + encodeURIComponent('' + Id) + '&';
    }

    if (userId !== undefined && userId !== null) {
      url_ += 'UserId=' + encodeURIComponent('' + userId) + '&';

    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.delete(url_ , AppConsts.httpOptions);
  }

  getUsers(roleTypeId): Observable<any>{
    let url_ = AppConsts.apiUrl.getUsers;
    if (roleTypeId !== undefined) {
      url_ += 'roleTypeId=' + encodeURIComponent('' + roleTypeId);
    }
    return this.http.get(url_, AppConsts.httpOptions)
  }

  saveUser(model:UserDto): Observable<any>{
    let url_ = AppConsts.apiUrl.saveUser;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  updateUser(model:UserDto): Observable<any>{
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
  getDecrypted(encryptedValue): Observable<any>{
    let url_ = AppConsts.apiUrl.decrypted;
    if (encryptedValue !== undefined) {
      url_ += 'EncryptedKey=' + encodeURIComponent('' + encryptedValue) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions)
  }

  getRoles(): Observable<any>{
    let url_ = AppConsts.apiUrl.getUsers;
    return this.http.get(url_, AppConsts.httpOptions)
  }

  getUsersByRole(roleId): Observable<any>{
    let url_ = AppConsts.apiUrl.getUsersByRole;
    if (roleId !== undefined) {
      url_ += 'roleId=' + encodeURIComponent('' + roleId);
    }
    return this.http.get(url_, AppConsts.httpOptions)
  }


}
