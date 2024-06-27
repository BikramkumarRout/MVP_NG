import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { appSettingDto } from './appSetting';

@Injectable()
export class ApplicationSettingService {

  constructor(private http: HttpClient) { }



  getAppSetting(
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.getApplicationSetting;
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }


  saveApplicationSetting(data:appSettingDto): Observable<any>{
    let url_ = AppConsts.apiUrl.saveApplicationSetting;
    
    return this.http.post(url_, data, AppConsts.httpOptions);
  }
 
  // saveApplicationSetting(Id: number | null | undefined,
  //   Key: string | null | undefined,
  //   Value: string | null | undefined,
  //   FieldType: string | null | undefined,
  //   Label:string | null | undefined,
  //   Page: string | null | undefined,

  //   ): Observable<any> {
  //     let data = {        
  //       'Id' : Id,
  //       'Key': Key,        
  //       'Value': Value,
  //       'FieldType':FieldType,
  //       'Label':Label,
  //       'Page':Page
  //     }
      
  //   let url_ = AppConsts.apiUrl.saveApplicationSetting;
    
  //   return this.http.post(url_, data, AppConsts.httpOptions);
  // }

 
}
