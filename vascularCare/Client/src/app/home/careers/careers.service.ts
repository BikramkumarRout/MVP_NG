import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConsts } from '../../shared/core/common/app-constant';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';
import { JobsDto } from './jobs/edit-jobs/jobs';

@Injectable()
export class CareersService {


  constructor(private http: HttpClient) {
  }

  saveUpdateJobs(model:JobsDto): Observable<any> {
    let url_ = AppConsts.apiUrl.saveUpdateJobs;
    return this.http.post(url_, model, AppConsts.httpOptions)
  }


  getJobs(isActive: number | null | undefined): Observable<any> {
    let url_ = AppConsts.apiUrl.getJobs;
    if (isActive !== undefined) {
      url_ += 'isActive=' + encodeURIComponent('' + isActive);
    }
    return this.http.get(url_, AppConsts.httpOptions)
  }


 


  DeleteJob(jobId: number | null | undefined,
    userId?: number | null | undefined
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.deleteJob;
    if (jobId !== undefined && jobId !== null) {
      url_ += 'jobId=' + encodeURIComponent('' + jobId) + '&';
    }
    if (userId !== undefined && userId !== null) {
      url_ += 'UserId=' + encodeURIComponent('' + userId) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.delete(url_ , AppConsts.httpOptions);
  }
}