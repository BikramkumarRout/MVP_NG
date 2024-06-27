import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { RoleDto } from './role';

@Injectable()
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<any>{
    let url_ = AppConsts.apiUrl.getRoles;
    return this.http.get(url_, AppConsts.httpOptions)
  }
  getPermissions(roleId): Observable<any>{
    let url_ = AppConsts.apiUrl.getPermisions;
    if (roleId !== undefined) {
      url_ += 'RoleId=' + encodeURIComponent('' + roleId) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions)
  }
  saveRole(model: RoleDto): Observable<any>{
    let url_ = AppConsts.apiUrl.saveRole;
    return this.http.post(url_,model, AppConsts.httpOptions)

  }
  DeleteUser(Id: number | null | undefined,
    userId: number | null | undefined
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.deleteUser;
    if (Id !== undefined && Id !== null) {
      url_ += 'Id=' + encodeURIComponent('' + Id) + '&';
    }

    if (userId !== undefined && userId !== null) {
      url_ += 'UserId=' + encodeURIComponent('' + userId) + '&';

    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.delete(url_ , AppConsts.httpOptions);
  }

}
