import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
@Injectable()
export class ClinicalTeamService {


  constructor(private http: HttpClient) {
  }
  
  getMvpTeamBioByIdWithCount(teamType: number | null | undefined): Observable<any> {
    let url_ = AppConsts.apiUrl.getMvpTeamBioByIdWithCount;
    if (teamType !== undefined && teamType !== null) {
      url_ += 'teamType=' + encodeURIComponent('' + teamType) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_ , AppConsts.httpOptions);
  }
  DeleteUser(bioId: number | null | undefined,
    userId: number | null | undefined
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.deleteMvpTeamBio;
    if (bioId !== undefined && bioId !== null) {
      url_ += 'bioId=' + encodeURIComponent('' + bioId) + '&';
    }

    if (userId !== undefined && userId !== null) {
      url_ += 'UserId=' + encodeURIComponent('' + userId);

    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.delete(url_ , AppConsts.httpOptions);
  }



  getMvpTeam(teamType): Observable<any> {
    let url_ = AppConsts.apiUrl.getMvpTeam;
    if (teamType !== undefined) {
      url_ += 'teamType=' + encodeURIComponent('' + teamType);
    }
    return this.http.get(url_, AppConsts.httpOptions)
  }

  getMvpTeamBioById(bioId):Observable<any> {
    let url_ = AppConsts.apiUrl.getMvpTeamBioById;
    if (bioId !== undefined) {
      url_ += 'bioId=' + encodeURIComponent('' + bioId);
    }
    return this.http.get(url_, AppConsts.httpOptions)
  }


}