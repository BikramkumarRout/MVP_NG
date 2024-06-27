import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConsts } from '../../shared/core/common/app-constant';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';

@Injectable()
export class CareersService {


  constructor(private http: HttpClient) {
  }

  


  getJobs(): Observable<any> {
    let url_ = AppConsts.apiUrl.getJobs;
    return this.http.get(url_, AppConsts.httpOptions)
  }


 


  
}