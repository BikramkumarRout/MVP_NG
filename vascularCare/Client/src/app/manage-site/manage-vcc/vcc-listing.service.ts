import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { VccDto } from './vcc-details';

@Injectable()
export class VccService {

  constructor(private http: HttpClient) { }



  getVccFacility(
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.getInternalUserVccFacility;
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }



 
//   updateVccFacility(id: number | null | undefined,
//     name: string | null | undefined,
//     isVcc: string | null | undefined,
//     isAdministrativeOffice: string | null | undefined,
//     isArchived:string | null | undefined,
//     status: number | null | undefined,

//     ): Observable<any> {
//       let data = {        
//         'id' : id,
//         'name': name,        
//         'isVcc': isVcc,
//         'isAdministrativeOffice':isAdministrativeOffice,
//         'isArchived':isArchived,
//         'status':status
//       }
      
//     let url_ = AppConsts.apiUrl.updateVccFacility;
    
//     return this.http.post(url_, data, AppConsts.httpOptions);
//   }

updateVccFacility(model:VccDto): Observable<any>{
    let url_ = AppConsts.apiUrl.updateVccFacility;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }

  updateFacility(id: number | null | undefined,
    name: string | null | undefined,
    isVcc: string | null | undefined,
    isAdministrativeOffice: string | null | undefined,
    isArchived:string | null | undefined,
    status: number | null | undefined,

    ): Observable<any> {
      let data = {        
        'id' : id,
        'name': name,        
        'isVcc': isVcc,
        'isAdministrativeOffice':isAdministrativeOffice,
        'isArchived':isArchived,
        'status':status,
        
      }
      
    let url_ = AppConsts.apiUrl.updateFacility;
    
    return this.http.post(url_, data, AppConsts.httpOptions);
  }

}
