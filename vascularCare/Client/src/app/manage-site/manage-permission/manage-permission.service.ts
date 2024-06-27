import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';

import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { PermissionDto } from './manage-permission';

@Injectable()

export class PermissionService {

  constructor(private http: HttpClient) { }

  getPermissions(): Observable<any> {
    let url_ = AppConsts.apiUrl.getAllPermisions;
    return this.http.get(url_, AppConsts.httpOptions)
  }
  getPermissionLookUp(id: number): Observable<any> {
    let url_ = AppConsts.apiUrl.getPermisionLookUp;

    if (id !== undefined) {
      url_ += 'PermissionId=' + encodeURIComponent('' + id) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions)
  }

  getPermissionById(permissionId): Observable<any> {
    let url_ = AppConsts.apiUrl.getPermisionById;
    if (permissionId !== undefined) {
      url_ += 'PermissionId=' + encodeURIComponent('' + permissionId) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions)
  }

  savePermission(model: PermissionDto): Observable<any> {
    let url_ = AppConsts.apiUrl.savePermission;
    return this.http.post(url_, model, AppConsts.httpOptions)
  }

  getIsPermissionEdit(permissionName: string): Observable<any>{
    let url_ = AppConsts.apiUrl.getIsPermissionEdit;
    if (permissionName !== undefined) {
      url_ += 'PermissionName=' + encodeURIComponent('' + permissionName) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions)
  }

  deletePermisionLookUp(permissionId: number | null | undefined,
    userId: number | null | undefined
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.deletePermission;
    if (permissionId !== undefined && permissionId !== null) {
      url_ += 'PermissionId=' + encodeURIComponent('' + permissionId) + '&';
    }

    if (userId !== undefined && userId !== null) {
      url_ += 'UserId=' + encodeURIComponent('' + userId) + '&';

    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.delete(url_ , AppConsts.httpOptions);
  }

}
