import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  
} from 'rxjs/operators';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';

@Injectable()
export class JobDetailsService {

  constructor(private http: HttpClient,private sharedDataService:ShareDataService) { }

  uploadFile(form_Data): Observable<any>{
    let url_ = AppConsts.apiUrl.applyJob;
    // let encryptionToken = AppConsts.message.encryptionToken;
    // let  token = this.sharedDataService.encryptData(encryptionToken);
    return this.http.post(url_, form_Data, 
    //     {
    // headers: new HttpHeaders({
    //     'Authorization': token,
    //     })
    // }
    );
  }
 
  
 
}
