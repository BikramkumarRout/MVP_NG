import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConsts } from '../shared/core/common/app-constant';
import { ExceptionService } from '../shared/core/common/exceptionService';
import { ShareDataService } from '../shared/core/common/sharedDataService';

import { getFileNameFromResponseContentDisposition, saveFile } from '../../app/shared/core/common/file.download.helper';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';


@Injectable()
export class AppointmentService {
  private notify = new Subject<any>();
  public notifyObservable$ = this.notify.asObservable();
  apiURL: any;
  headerFileName: any;

  constructor(private http: HttpClient, private exceptionService: ExceptionService, private sharedDataService: ShareDataService) {

  }
  pageReloadFacilityId(data: any) {
    this.notify.next(data);
  }

  onGetData(): Observable<any> {

    let filter = 'ddd';
    let url_ = AppConsts.apiUrl.getTestData;
    if (filter !== undefined) {
      url_ += 'filter=' + encodeURIComponent('' + filter) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');

    return this.http.get(url_, AppConsts.httpOptions);


  }

  getNextDosAppointment(filter: string | null | undefined,
    sorting: string | null | undefined,
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined,
    FacilityId: number | null | undefined,
    SortingType: string | null | undefined = "Asc",
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.getNextDosAppointment;
    let facilityId =+ this.sharedDataService.getSelectedFacilityId();
    if (filter !== undefined) {
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
    if (facilityId !== undefined) {
      url_ += 'facilityId=' + encodeURIComponent('' + facilityId) + '&';
    }
    url_ += 'sortingType=' + encodeURIComponent('' + SortingType) + '&';
    url_ = url_.replace(/[?&]$/, '');

    return this.http.get(url_, AppConsts.httpOptions);
  }

  downloadFile(): Observable<Blob> {
    let url_ = AppConsts.apiUrl.downloadPastAppoinements;
    let facilityId =+ this.sharedDataService.getSelectedFacilityId();
    url_ += 'facilityId=' + encodeURIComponent('' + facilityId) + '&';
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get<Blob>(url_, { observe: 'body', responseType: 'blob' as 'json' });

  }

  postAndGetResponse(FacilityId) {
    let url_ = AppConsts.apiUrl.downloadPastAppoinements;
    let facilityId =+ this.sharedDataService.getSelectedFacilityId();
    return this.http.get(url_ + 'facilityId=' + facilityId, { responseType: 'blob' as 'blob' });
  }

  downloadPastAppointment(filter: string | null | undefined,
    sorting: string | null | undefined,
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined,
    FacilityId: number | null | undefined,
    SortingType: string | null | undefined = "Asc",

  ): Observable<any> {
    let url_ = AppConsts.apiUrl.downloadPastAppoinements;
    let facilityId =+ this.sharedDataService.getSelectedFacilityId();

    if (filter !== undefined) {
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
    if (facilityId !== undefined) {
      url_ += 'FacilityId=' + encodeURIComponent('' + facilityId) + '&';
    }
    url_ += 'sortingType=' + encodeURIComponent('' + SortingType) + '&';
    url_ = url_.replace(/[?&]$/, '');

     return this.http.get(url_, AppConsts.httpOptions);
    // return this.http.get('https://app-mvp-prod-api-stage.azurewebsites.net/api/Appointment/DownloadPastAppoinements?facilityId=279084')
  }

  getPastAppointment(filter: string | null | undefined,
    sorting: string | null | undefined,
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined,
    FacilityId: number | null | undefined,
    SortingType: string | null | undefined = "Asc",

  ): Observable<any> {
    let url_ = AppConsts.apiUrl.getPastAppointment;
    let facilityId =+this.sharedDataService.getSelectedFacilityId();

    if (filter !== undefined) {
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
    if (facilityId !== undefined) {
      url_ += 'FacilityId=' + encodeURIComponent('' + facilityId) + '&';
    }
    url_ += 'sortingType=' + encodeURIComponent('' + SortingType) + '&';
    url_ = url_.replace(/[?&]$/, '');

    return this.http.get(url_, AppConsts.httpOptions);
  }

  getFutureAppointment(filter: string | null | undefined,
    sorting: string | null | undefined,
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined,
    FacilityId: number | null | undefined,
    SortingType: string | null | undefined = "Asc",

  ): Observable<any> {
    let url_ = AppConsts.apiUrl.getFutureAppointment;
    let facilityId =+ this.sharedDataService.getSelectedFacilityId();

    if (filter !== undefined) {
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
    if (facilityId !== undefined) {
      url_ += 'FacilityId=' + encodeURIComponent('' + facilityId) + '&';
    }
    url_ += 'sortingType=' + encodeURIComponent('' + SortingType) + '&';
    url_ = url_.replace(/[?&]$/, '');

    return this.http.get(url_, AppConsts.httpOptions);
  }


  getAppointments(filter: string | null | undefined,
    sorting: string | null | undefined,
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined,
    SortingType: string | null | undefined = "Asc",
    FacilityId: number | null | undefined

  ): Observable<any> {
    let url_ = AppConsts.apiUrl.getAppointmet;
    let facilityId =+ this.sharedDataService.getSelectedFacilityId();

    if (filter !== undefined) {
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
    if (facilityId !== undefined) {
      url_ += 'FacilityId=' + encodeURIComponent('' + facilityId) + '&';
    }
    url_ += 'sortingType=' + encodeURIComponent('' + SortingType) + '&';
    url_ = url_.replace(/[?&]$/, '');

    return this.http.get(url_, AppConsts.httpOptions);
  }

  // getPastAppointmentLazyLoad(params?: any)  {
  //   let url_ = AppConsts.apiUrl.getPastAppointmentLazyLoad;
  //   let facilityId = + this.sharedDataService.getSelectedFacilityId();
  //   console.log(params);
  //    if (params.globalFilter !== undefined) {
  //      url_ += 'Filter=' + encodeURIComponent('' + params.globalFilter) + '&';
  //    }
  //   if (params.sortField !== undefined) {
  //     url_ += 'Sorting=' + encodeURIComponent('' + params.sortField) + '&';
  //   }
  //   if (params.first !== undefined) {
  //     let page = (params.first / params.rows) + 1;
  //     url_ += 'SkipCount=' + encodeURIComponent('' + page) + '&';
  //   }
  //   else {
  //     url_ += 'SkipCount=1&';
  //   }
    
  //   if (params.rows !== undefined) {
  //     url_ += 'MaxResultCount=' + encodeURIComponent('' + params.rows) + '&';
  //   }
  //   if (facilityId !== undefined) {
  //     url_ += 'FacilityId=' + encodeURIComponent('' + facilityId) + '&';
  //   }
  //    url_ += 'SortingType=' + encodeURIComponent('' + params.sortOrder) + '&';
  //    url_ = url_.replace(/[?&]$/, '');

  //   return this.http.get<any>(url_, AppConsts.httpOptions)//.then(res => <AppointmentDetail[]>res.pasAppointments)
  //   //.then(data => { return data; });
  // }
}
