import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConsts } from '../../shared/core/common/app-constant';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';
declare var $;

@Injectable()
export class ProfileService {
  private notify = new Subject<any>();
  public notifyObservable$ = this.notify.asObservable();
  static ShareDataService: any;
  constructor(private http: HttpClient) { }
  pageReloadOnPagination(data: any) {
    this.notify.next(data);
  }

  getPatientProfile(patientid: number | null | undefined,
    FacilityId:number | null | undefined): Observable<any> {
    let url_ = AppConsts.apiUrl.getPatientProfile;
    let facilityId = +sessionStorage.getItem("selectedFacilityId");
    url_ += 'PatientId=' + patientid + '&';
    url_ += 'FaclitiyId=' + facilityId + '&';
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }

  getPatientInsurance(patientid: number | null | undefined,
    FacilityId:number | null | undefined): Observable<any> {
    let url_ = AppConsts.apiUrl.getPatientInsurance;
    let facilityId = +sessionStorage.getItem("selectedFacilityId");
    url_ += 'PatientId=' + patientid + '&';
    url_ += 'FaclitiyId=' + facilityId + '&';
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }

  getPatientHistory(filter: string | null | undefined,
    sorting: string | null | undefined,
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined,
    patientid: number | null | undefined,
    FacilityId:number | null | undefined,
    SortingType: string | null | undefined = "Asc"): Observable<any> {
    let url_ = AppConsts.apiUrl.getPatientHistory;
    let facilityId = +sessionStorage.getItem("selectedFacilityId");
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
    url_ += 'PatientId=' + patientid + '&';
    url_ += 'FacilityId=' + facilityId + '&';
    url_ += 'SortingType=' + encodeURIComponent('' + SortingType) + '&';
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }

  getUpcomingAppointment(filter: string | null | undefined,
    sorting: string | null | undefined,
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined,
    patientid: number | null | undefined,
    FacilityId:number | null | undefined,
    SortingType: string | null | undefined = "Asc"): Observable<any> {
    let url_ = AppConsts.apiUrl.getUpcomingAppointments;
    let facilityId = +sessionStorage.getItem("selectedFacilityId");
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
    url_ += 'PatientId=' + patientid + '&';
    url_ += 'FacilityId=' + facilityId + '&';
    url_ += 'SortingType=' + encodeURIComponent('' + SortingType) + '&';
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }

}
