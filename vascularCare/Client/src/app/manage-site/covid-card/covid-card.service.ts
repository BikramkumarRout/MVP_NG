import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    mergeMap as _observableMergeMap,
    catchError as _observableCatch,
    catchError
} from 'rxjs/operators';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
@Injectable()
export class CovidCardService {

    constructor(private http: HttpClient, private sharedDataService: ShareDataService) { }

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


    getCovidCardProvider(
    ): Observable<any> {
        let url_ = AppConsts.apiUrl.getCovidCardProvider;
        url_ = url_.replace(/[?&]$/, '');
        return this.http.get(url_, AppConsts.httpOptions);
    }

    getCovidFile(facilityId: number | null | undefined,
        staffMemberId: number | null | undefined,
    ): Observable<any> {
        let url_ = AppConsts.apiUrl.getCovidUrl;
        if (facilityId !== undefined && facilityId !== null) {
            url_ += 'FacilityId=' + encodeURIComponent('' + facilityId) + '&';
        }
        if (staffMemberId !== undefined && staffMemberId !== null) {
            url_ += 'StaffMemberId=' + encodeURIComponent('' + staffMemberId);
        }
        return this.http.get(url_, AppConsts.httpOptions);
    }

    removeCovidFile(facilityId: number | null | undefined,
        staffMemberId: number | null | undefined,
        userId: number | null | undefined
    ): Observable<any> {
        let url_ = AppConsts.apiUrl.removeCovidFile;
        if (facilityId !== undefined && facilityId !== null) {
            url_ += 'FacilityId=' + encodeURIComponent('' + facilityId) + '&';
        }
        if (staffMemberId !== undefined && staffMemberId !== null) {
            url_ += 'StaffMemberId=' + encodeURIComponent('' + staffMemberId) + '&';
        }
        if (userId !== undefined && userId !== null) {
            url_ += 'UserId=' + encodeURIComponent('' + userId);
        }
        return this.http.delete(url_, AppConsts.httpOptions);
    }

    uploadFile(form_Data): Observable<any>{
        let url_ = AppConsts.apiUrl.saveCovidFile;
        return this.http.post(url_, form_Data, 
        );
      }

  
}
