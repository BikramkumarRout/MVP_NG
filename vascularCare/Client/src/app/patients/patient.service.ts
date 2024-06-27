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

@Injectable()
export class PatientService {
  filter: any;
  constructor(private http: HttpClient, private exceptionService: ExceptionService) {
  }

  onGetData(): Observable<any> {
    let filter = 'ddd';
    let url_ = AppConsts.apiUrl.getTestData;
    if (filter !== undefined) {
      url_ += 'filter=' + encodeURIComponent('' + filter) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');

    return this.http.get(url_, AppConsts.httpOptions);
    //   .pipe(catchError(this.exceptionService.catchBadResponse));
    //Above one is working copy

    // let model = {
    //   filter: 'test',
    //   sorting:'asc'
    // }
    // return this.http.post(AppConsts.apiUrl.getTestData, model, AppConsts.httpOptions);
  }

  getCommonProvider(FacilityId: number | null | undefined = 233690,
    skipCount = 0): Observable<any> {
    let url_ = AppConsts.apiUrl.getCommonProvider;
    url_ += 'FacilityId=' + FacilityId + '&';
    url_ += 'skipCount=' + skipCount + '&';
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }


  getFacilityData(): Observable<any> {
    let url_ = AppConsts.apiUrl.login;
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }

  getPatients(filter: string | null | undefined,
    sorting: string | null | undefined,
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined,
    FacilityId: number | null | undefined,
    SortingType: string | null | undefined = "Asc",
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.getPatient;
    let facilityId = sessionStorage.getItem("selectedFacilityId");
    if (filter !== undefined && filter !== null) {
      url_ += 'filter=' + encodeURIComponent('' + filter) + '&';
    }
    if (sorting !== undefined) {
      url_ += 'sorting=' + encodeURIComponent('' + sorting) + '&';
    }
    if (skipCount !== undefined) {
      url_ += 'skipCount=' + encodeURIComponent('' + skipCount) + '&';
    }
    if (maxResultCount !== undefined) {
      url_ += 'maxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
    }
    url_ += 'SortingType=' + encodeURIComponent('' + SortingType) + '&';

    url_ += 'FacilityId=' + encodeURIComponent('' + facilityId) + '&';
    url_ = url_.replace(/[?&]$/, '');

    return this.http.get(url_, AppConsts.httpOptions);
  }

  getPatients1(
  ): Observable<any> {
    let filter = null;
    let sorting = null;
    let skipCount = 0;
    let FacilityId = 232904;
    let maxResultCount = 20;
    let SortingType = null;

    let url_ = AppConsts.apiUrl.getPatient;
    if (filter !== undefined && filter !== null) {
      url_ += 'filter=' + encodeURIComponent('' + filter) + '&';
    }
    if (sorting !== undefined) {
      url_ += 'sorting=' + encodeURIComponent('' + sorting) + '&';
    }
    if (skipCount !== undefined) {
      url_ += 'skipCount=' + encodeURIComponent('' + skipCount) + '&';
    }
    if (maxResultCount !== undefined) {
      url_ += 'maxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
    }
    url_ += 'SortingType=' + encodeURIComponent('' + SortingType) + '&';

    url_ += 'FacilityId=' + encodeURIComponent('' + FacilityId) + '&';
    url_ = url_.replace(/[?&]$/, '');

    return this.http.get(url_, AppConsts.httpOptions);
  }
}
