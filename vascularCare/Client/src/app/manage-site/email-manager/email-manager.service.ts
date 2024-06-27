import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { MailCampaignsDto } from './email-manager';


@Injectable()
export class MailCampaignTextService {

  constructor(private http: HttpClient) { }



  getMailCampaignText(
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.getEmailIdText;
    url_ = url_.replace(/[?&]$/, '');
    //Deepak later need to check
    // return this.http.get<MailCampaignsDto[]>(url_);
    // return this.http.get(url_)
    // .map((response: Response) => <MailCampaignsDto[]>response.json());
    return this.http.get(url_, AppConsts.httpOptions);
  }



  prepareBatch(
    mailCampaingId: number | null | undefined,
    mailCampainText: string | null | undefined,
    email: string | null | undefined,
    isTesting: boolean | null | undefined,
    userId: number | null | undefined,
    applicantId: number | null | undefined

  ): Observable<any> {
    let url_ = AppConsts.apiUrl.prepareBatch;

    // if (mailCampaingId !== undefined && mailCampaingId !== null) {
    //   url_ += 'mailCampaingId=' + encodeURIComponent('' + mailCampaingId) + '&';
    // }
    // if (mailCampainText !== undefined && mailCampainText !== null) {
    //   url_ += 'mailCampainText=' + encodeURIComponent('' + mailCampainText) + '&';
    // }
    // url_ += 'email=' + encodeURIComponent('' + email) + '&';

    // if (isTesting !== undefined && isTesting !== null) {
    //   url_ += 'isTesting=' + encodeURIComponent('' + isTesting) + '&';

    // }

    // if (userId !== undefined && userId !== null) {
    //   url_ += 'userId=' + encodeURIComponent('' + userId) + '&';
    // }
    // if (applicantId !== undefined && applicantId !== null) {
    //   url_ += 'applicantId=' + encodeURIComponent('' + applicantId) + '&';
    // }
    let data = {        
      'mailCampaingId': mailCampaingId,
      'mailCampainText' : mailCampainText,
      'email': email,        
      'isTesting':isTesting,
      'userId':userId,
      'applicantId':applicantId
    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.post(url_, data, AppConsts.httpOptions);
  }

  searchEmails(dateFrom: string | null | undefined,
    dateTo: string | null | undefined,
    campaignIds: any[],
    types: any[],
    sendStatuses:any[],
    userId: number | null | undefined,

    ): Observable<any> {
      let data = {        
        'campaignIds': campaignIds,
        'dateFrom' : dateFrom,
        'dateTo': dateTo,        
        'sendStatuses':sendStatuses,
        'types':types,
        'userId':userId
      }     
      
    let url_ = AppConsts.apiUrl.searchEmails;
    
    return this.http.post(url_, data, AppConsts.httpOptions);
  }

  getApplicants(): Observable<any> {
    let url_ = AppConsts.apiUrl.getApplicants;
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }
  onGetFacesheets(): Observable<any> {
    let url_ = AppConsts.apiUrl.onGetFacesheets;
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }

 sendMessages(messages:any[],
  userId: number | null | undefined,
  ): Observable<any> {
    let data = {        
      'messages':messages,
      'userId':userId
    }
    let url_ = AppConsts.apiUrl.sendMessages;
    return this.http.post(url_, data, AppConsts.httpOptions);
 }

 getApplicantJobDetails(): Observable<any> {
  let url_ = AppConsts.apiUrl.getApplicantJobDetails;
  url_ = url_.replace(/[?&]$/, '');
  return this.http.get(url_, AppConsts.httpOptions);
}

getApplicantFileUrl(documentId: number | null | undefined,
  
): Observable<any> {
  let url_ = AppConsts.apiUrl.getApplicantFileUrl;
  if (documentId !== undefined && documentId !== null) {
      url_ += 'documentId=' + encodeURIComponent('' + documentId);
  }
  
  return this.http.get(url_, AppConsts.httpOptions);
}

DeleteApplicant(applicantId: number | null | undefined,
  userId: number | null | undefined
): Observable<any> {
  let url_ = AppConsts.apiUrl.deleteApplicant;
  if (applicantId !== undefined && applicantId !== null) {
    url_ += 'applicantId=' + encodeURIComponent('' + applicantId) + '&';
  }


  if (userId !== undefined && userId !== null) {
    url_ += 'userId=' + encodeURIComponent('' + userId) + '&';

  }
  url_ = url_.replace(/[?&]$/, '');
  return this.http.delete(url_ , AppConsts.httpOptions);
}

}
