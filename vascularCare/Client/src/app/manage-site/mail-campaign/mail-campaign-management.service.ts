import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { MailCampaginDto } from './mail-campaign';
import { RecipientDto } from './recipient';

@Injectable()
export class MailCampaignManagementService {

  constructor(private http: HttpClient) { }



  getMailCampaign(
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.getMailCampaigns;
    url_ = url_.replace(/[?&]$/, '');
    return this.http.get(url_, AppConsts.httpOptions);
  }

  DeleteEmail(
    id: number | null | undefined,
    userId: number | null | undefined,
    RecepientEmail: string | null | undefined,
    EmailRecipientTypeId: number | null | undefined
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.deleteMail;

    if (id !== undefined && id !== null) {
      url_ += 'Id=' + encodeURIComponent('' + id) + '&';
    }
    if (userId !== undefined && userId !== null) {
      url_ += 'UserId=' + encodeURIComponent('' + userId) + '&';
    }
    if (RecepientEmail !== undefined && RecepientEmail !== null) {
      url_ += 'RecepientEmail=' + encodeURIComponent('' + RecepientEmail) + '&';

    }
    if (EmailRecipientTypeId !== undefined && EmailRecipientTypeId !== null) {
      url_ += 'EmailRecipientTypeId=' + encodeURIComponent('' + EmailRecipientTypeId) + '&';

    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.delete(url_, AppConsts.httpOptions);
  }

  saveUpdateEmails(model:RecipientDto): Observable<any> {
    let url_ = AppConsts.apiUrl.saveUpdateMail;
    return this.http.post(url_, model, AppConsts.httpOptions)
  }

  getUpdatedEmails(MailCampaingId: number | null | undefined,
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.getUpdatedMail;
    if (MailCampaingId !== undefined && MailCampaingId !== null) {
      url_ += 'MailCampaingId=' + encodeURIComponent('' + MailCampaingId) + '&';
    }
    return this.http.get(url_, AppConsts.httpOptions)
  }

  getUpdateMailCampaignType(MailCampaingId: number | null | undefined,
    MailCampaingTypeId: number | null | undefined
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.getUpdateMailCampaignType;
    if (MailCampaingId !== undefined && MailCampaingId !== null) {
      url_ += 'MailCampaingId=' + encodeURIComponent('' + MailCampaingId) + '&';
    }
    if (MailCampaingTypeId !== undefined && MailCampaingTypeId !== null) {
      url_ += 'MailCampaingTypeId=' + encodeURIComponent('' + MailCampaingTypeId) + '&';
    }
    return this.http.get(url_, AppConsts.httpOptions)
  }

  saveUpdateMailCampaign(model): Observable<any> {
    let url_ = AppConsts.apiUrl.saveUpdateMailCampaign;
    return this.http.post(url_, model, AppConsts.httpOptions)
  } 
  DeleteCampaign(Id: number | null | undefined,
    userId: number | null | undefined
  ): Observable<any> {
    let url_ = AppConsts.apiUrl.deleteCorporation;
    if (Id !== undefined && Id !== null) {
      url_ += 'CampaignId=' + encodeURIComponent('' + Id) + '&';
    }

    if (userId !== undefined && userId !== null) {
      url_ += 'UserId=' + encodeURIComponent('' + userId) + '&';

    }
    url_ = url_.replace(/[?&]$/, '');
    return this.http.delete(url_ , AppConsts.httpOptions);
  }
}
