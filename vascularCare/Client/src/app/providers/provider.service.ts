import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConsts } from '../shared/core/common/app-constant';
import { ExceptionService } from '../shared/core/common/exceptionService';
import { ShareDataService } from '../shared/core/common/sharedDataService';

import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';

@Injectable()
export class ProviderService {

    constructor(private http: HttpClient, private exceptionService: ExceptionService, private sharedDataService: ShareDataService) {
   }


  isProviderExist(filter: string | null | undefined,
    sorting: string | null | undefined,
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined,
    SortingType: string | null | undefined = "Asc") : Observable<any> {
    let url_ = AppConsts.apiUrl.isProviderExists;
    let facilityId = this.sharedDataService.getSelectedFacilityId();
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

  getProvider1(
    ): Observable<any> {
     let filter = null;
     let sorting = null;
     let skipCount = 0;
      let FacilityId = 232904;
      let maxResultCount = 20;
      let SortingType = null;
    let url_ = AppConsts.apiUrl.getProvider;
    let facilityId = this.sharedDataService.getSelectedFacilityId();;

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

  getProviders(filter: string | null | undefined,
    sorting: string | null | undefined,
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined,
    FacilityId: number | null | undefined,
    SortingType: string | null | undefined = "Asc",
    ): Observable<any> {
    let url_ = AppConsts.apiUrl.getProvider;
    let facilityId = this.sharedDataService.getSelectedFacilityId();
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

}
