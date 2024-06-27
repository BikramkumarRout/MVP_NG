import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConsts } from '../shared/core/common/app-constant';
import { ExceptionService } from '../shared/core/common/exceptionService';
import { ShareDataService } from '../shared/core/common/sharedDataService';

import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';
declare var $;

@Injectable()
export class DashboardService {
  private notify = new Subject<any>();
  public notifyObservable$ = this.notify.asObservable();
  private notifyChart = new Subject<any>();
  public notifyChartObservable$ = this.notifyChart.asObservable();

  public facilityInfo;

  constructor(private http: HttpClient, private exceptionService: ExceptionService, private sharedDataService: ShareDataService) { }

  pageReloadFacilityId(data: any) {
    this.notify.next(data);
  }
  pageReloadChart(data: any) {
    this.notifyChart.next(data);
  }

  setFacilityInfo(facilityInfo): void {
    this.facilityInfo = facilityInfo;
  }

  getFacilityInfo(): any {
    return this.facilityInfo;
  }

  onAjaxCall() {
    let url_ = AppConsts.apiUrl.getTestData2 + '/' + 4;
    let token = this.sharedDataService.getBearerToken();
    $.ajax({
      type: "GET",
      url: url_,
      headers: {
        Authorization: 'Bearer ' + token
      },
      dataType: 'json',
      success: function (result, status, xhr) {
       
      },
      error: function (xhr, status, error) {
        alert(error);
      }
    });
  }

  uploadFile(files) {
    let url_ = AppConsts.apiUrl.saveFile;
    let formData = new FormData();
    formData.append(files.name, files);
    const uploadReq = new HttpRequest('POST', url_, formData, {
    });
    return this.http.request(uploadReq).subscribe(event => {

    });
  }

  getNextDos(facilityId): Observable<any> {
    facilityId = + this.sharedDataService.getSelectedFacilityId();
    let url_ = AppConsts.apiUrl.getNextDos;
    url_ += 'FacilityId=' + facilityId + '&';
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }

  getPatientChartData(): Observable<any> {
    let facilityId =+ this.sharedDataService.getSelectedFacilityId();
    let url_ = AppConsts.apiUrl.getChartData;
    url_ += 'FacilityId=' + facilityId + '&';
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }
  getPatientBarChartData(requestTab: any): Observable<any> {
    let facilityId =+ this.sharedDataService.getSelectedFacilityId();
    let url_ = AppConsts.apiUrl.getbarChartData;
    url_ += 'FacilityId=' + facilityId + '&';
    url_ += 'RequestTab=' + requestTab + '&';
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }


  getDashboards(filter: string | null | undefined,
    sorting: string | null | undefined,
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined,
    facilityId: number | null | undefined,
    requestTab: number | null | undefined,
    SortingType: string | null | undefined = "Asc"): Observable<any> {
    let url_ = AppConsts.apiUrl.getDashboard;
    facilityId =+ this.sharedDataService.getSelectedFacilityId();

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
    if (requestTab !== undefined) {
      url_ += 'RequestTab=' + encodeURIComponent('' + requestTab) + '&';
    }
    url_ += 'SortingType=' + encodeURIComponent('' + SortingType) + '&';

    url_ += 'FacilityId=' + encodeURIComponent('' + facilityId) + '&';
    url_ = url_.replace(/[?&]$/, '');

    return this.http.get(url_, AppConsts.httpOptions);
  }

  dosDetail(DosCategory: string | null | undefined,
    Date: string | null | undefined,
    FacilityId: number | null | undefined,
    Flag: number | null | undefined): Observable<any> {
    FacilityId =+ this.sharedDataService.getSelectedFacilityId();
    let url_ = AppConsts.apiUrl.dosDetail;
    if (DosCategory !== undefined) {
      url_ += 'DosCategory=' + encodeURIComponent('' + DosCategory) + '&';
    }
    if (Date !== undefined) {
      url_ += 'Date=' + encodeURIComponent('' + Date) + '&';
    }
    if (Flag !== undefined) {
      url_ += 'Flag=' + encodeURIComponent('' + Flag) + '&';
    }
    url_ += 'FacilityId=' + FacilityId + '&';
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }

  saveUpdateVCCTransport(model): Observable<any> {
    let url_ = AppConsts.apiUrl.saveUpdateVCCTransport;
    return this.http.post(url_, model, AppConsts.httpOptions)

  }

  getVCCTransportDetail(facilityId: number | null | undefined,
    patientId: number | null | undefined,
    scheduledTime: string | null | undefined,): Observable<any> {
    let url_ = AppConsts.apiUrl.getVCCTransportDetail;
    if (facilityId !== undefined) {
      url_ += 'FacilityId=' + encodeURIComponent('' + facilityId) + '&';
    }
    if (patientId !== undefined) {
      url_ += 'PatientId=' + encodeURIComponent('' + patientId) + '&';
    }
    if (scheduledTime !== undefined) {
      url_ += 'ScheduledTime=' + encodeURIComponent('' + scheduledTime);
    }
    // url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }

  getVccAppointments(facilityId: number | null | undefined,
    patientId: number | null | undefined,
    filter: string | null | undefined,
    sorting: string | null | undefined,
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined,
    sortingType: string | null | undefined): Observable<any> {
    let url_ = AppConsts.apiUrl.getVccAppointments;
    facilityId =+ this.sharedDataService.getSelectedFacilityId();
    if (patientId !== undefined) {
      url_ += 'PatientId=' + encodeURIComponent('' + patientId) + '&';
    }
    if (filter !== undefined) {
      url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
    }
    if (sorting !== undefined) {
      url_ += 'Sorting=' + encodeURIComponent('' + sorting) + '&';
    }
    if (maxResultCount !== undefined) {
      url_ += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
    }
    if (skipCount !== undefined) {
      url_ += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
    }
    if (sortingType !== undefined) {
      url_ += 'SortingType=' + encodeURIComponent('' + sortingType) + '&';
    }

    url_ += 'FacilityId=' + facilityId + '&';

    url_ = url_.replace(/[?&]$/, '');

    return this.http.get(url_, AppConsts.httpOptions);

  }

}
