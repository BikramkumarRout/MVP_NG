import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { AppConsts } from './app-constant';
import { ShareDataService } from './sharedDataService';


@Injectable({
  providedIn: 'root',
})
export class CommonService {

  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();
  private isClientPortalHide = new Subject<any>();
  public isClientPortalHideObservable$ = this.isClientPortalHide.asObservable();


  constructor(private http: HttpClient, private sharedDataService: ShareDataService) {
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  setClientPortalHide(data: boolean) {
    this.isClientPortalHide.next(data);
  }

  // getClientPortalHide() {
  //   return this.isClientPortalHide;
  // }

  myMethod(data) {
     // I have data! Let's return it so subscribers can use it!
    // we can do stuff with data if we want
    this.myMethodSubject.next(data);
  }

  downloadAppointments(filter: string | null | undefined,
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
  }

  
  downloadExcel(
    facilityId: number | null | undefined,
    sorting: string | null | undefined,
    sortingType: string | null | undefined = "Asc",
    requestTypes: string | null | undefined,
    patientId?: number | null | undefined): Observable<any> {
    let url_ = AppConsts.apiUrl.excelExport;  
    facilityId =+ this.sharedDataService.getSelectedFacilityId();
    if (facilityId !== undefined) {
      url_ += 'facilityId=' + encodeURIComponent('' + facilityId) + '&';
    }
    if (sorting !== undefined) {
      url_ += 'sorting=' + encodeURIComponent('' + sorting) + '&';
    }
    if (sortingType !== undefined) {
      url_ += 'sortingType=' + encodeURIComponent('' + sortingType) + '&';
    }
    if (requestTypes !== undefined) {
      url_ += 'requestTypes=' + encodeURIComponent('' + requestTypes) + '&';
    }
    if (patientId !== undefined) {
      url_ += 'patientId=' + encodeURIComponent('' + patientId) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');


    return this.http.get<Blob>(url_, { observe: 'body', responseType: 'blob' as 'json' });
  }

  downloadFile(sorting: string | null | undefined,
    sortingType: string | null | undefined = "Asc",
    requestTypes: string | null | undefined): Observable<Blob> {
    let url_ = AppConsts.apiUrl.downloadPastAppoinements;
    let facilityId =+ this.sharedDataService.getSelectedFacilityId();
    url_ += 'facilityId=' + encodeURIComponent('' + facilityId) + '&';
    if (sorting !== undefined) {
      url_ += 'sorting=' + encodeURIComponent('' + sorting) + '&';
    }
    if (sortingType !== undefined) {
      url_ += 'sortingType=' + encodeURIComponent('' + sortingType) + '&';
    }
    if (requestTypes !== undefined) {
      url_ += 'requestTypes=' + encodeURIComponent('' + requestTypes) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get<Blob>(url_, { observe: 'body', responseType: 'blob' as 'json' });

  }

  saveInternalUser(model): Observable<any> {
    let url_ = AppConsts.apiUrl.saveInternalUser;
    return this.http.post(url_, model, AppConsts.httpOptions);
  }

  getLocationPatientCount(): Observable<any> {
    let url_ = AppConsts.apiUrl.getLocationPatientCount;
    return this.http.get(url_, AppConsts.httpOptions);
  }

  getVccFacility(
    ): Observable<any> {
      let url_ = AppConsts.apiUrl.getVccFacility;
      url_ = url_.replace(/[?&]$/, '');
      return this.http.get(url_, AppConsts.httpOptions);
    }

    getDocumentById(documentId: number | null | undefined,
      FolderName: string | null | undefined,
      ): Observable<any> {
        let url_ = AppConsts.apiUrl.getDocumentById;
        if (documentId !== undefined && documentId !== null) {
            url_ += 'documentId=' + encodeURIComponent('' + documentId)+ '&';
        }
        if (FolderName !== undefined && FolderName !== null) {
          url_ += 'FolderName=' + encodeURIComponent('' + FolderName);
      }
        
        return this.http.get(url_, AppConsts.httpOptions);
      }
}
