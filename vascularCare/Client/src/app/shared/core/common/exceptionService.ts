import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { AppConsts } from './app-constant';
//import { NotifyService } from 'abp-ng2-module/dist/src/notify/notify.service';


export class Error {
    title: string;
    messages: any;

}
@Injectable()
export class ExceptionService {

    constructor(private http: HttpClient,
        ) {

    }
    catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
        const res = <Response>errorResponse;

      if (res.status === 401) {
        console.log(errorResponse);
        console.log('Un authorized');
            //this.notify.info('Unauthorized access! You are no more an active user. Please contact administrator.');
            window.location.href = '/login';
            return of();
        } else if (res.status === 500) {
            //this.notify.info('Oops! Something went wrong! Please contact system administrator.');
            return of();
        } else if (res.status === 400) {
            const json = errorResponse.json();
            const error = new Error();
            error.title = 'The following problem(s) occured.';
            error.messages = json.errorMessages;

            return throwError(error);
        }
    }

}
