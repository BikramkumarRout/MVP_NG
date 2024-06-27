import { Injectable, NgModule } from '@angular/core';
import { Observable, throwError, of, Subject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerService } from './core/common/spinner';
import { ExceptionService } from './core/common/exceptionService';
import { AppConsts } from './core/common/app-constant';
import { ShareDataService } from './core/common/sharedDataService';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private spinner: SpinnerService, private sharedDataService: ShareDataService, private exceptionService: ExceptionService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let token = this.sharedDataService.getBearerToken();
    let encryptionToken = AppConsts.message.encryptionToken;

    if (token) {
      const newReq = req.clone(
        {
          headers: req.headers.set('Authorization', 'Bearer ' + token).set('JWTToken', encryptionToken)
        });
      return this.sendNextRequest(next, newReq);
    }
    else {
      token = this.sharedDataService.encryptData(encryptionToken);
      const newReq = req.clone(
        {

          headers: req.headers.set('Authorization', token).set('EncyptionToken', encryptionToken)
        });
      return this.sendNextRequest(next, newReq);
    }
  }

  private sendNextRequest(next: any, req: any): any {
    this.spinner.show();
    return next.handle(req).pipe(catchError(this.exceptionService.catchBadResponse),
      finalize(() => (this.spinner.hide())));
  }



};

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ]
})
export class HttpInterceptorModule { }
