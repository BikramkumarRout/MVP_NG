import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    mergeMap as _observableMergeMap,
    catchError as _observableCatch,
    catchError
} from 'rxjs/operators';
import { AppConsts } from 'src/app/shared/core/common/app-constant';


@Injectable()
export class BioUploadService {

    constructor(private http: HttpClient) { }


    saveUpdateBio(Id: number | null | undefined,
        Name: string | null | undefined,
        Designation: string | null | undefined,

        Education: string | null | undefined,
        Description: string | null | undefined,
        Residency: string | null | undefined,
        Speciality: string | null | undefined,
        HosAndClinicAff: string | null | undefined,
        DocumentId: number | null | undefined,
        TeamType: number | null | undefined,
        userId: number | null | undefined,
        file:any

    ): Observable<any> {
        let data = {
            'Id': Id,
            'Name': Name,
            'Designation': Designation,
            'Education': Education,
            'Description': Description,
            'Residency': Residency,
            'Speciality': Speciality,
            'HosAndClinicAff': HosAndClinicAff,
            'DocumentId': DocumentId,
            'TeamType': TeamType,
            'userId': userId,
            'file': file

        }

        let url_ = AppConsts.apiUrl.saveUpdateMvpTeamBio;

        return this.http.post(url_, data, AppConsts.httpOptions);
    }


    sendMessages(messages: any[],
        userId: number | null | undefined,
    ): Observable<any> {
        let data = {
            'messages': messages,
            'userId': userId
        }
        let url_ = AppConsts.apiUrl.sendMessages;
        return this.http.post(url_, data, AppConsts.httpOptions);
    }





}
