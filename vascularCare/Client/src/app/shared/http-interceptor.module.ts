import { Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, of, Subject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerService } from './core/common/spinner';
import { ExceptionService } from './core/common/exceptionService';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ShareDataService } from './core/common/sharedDataService';
import { AppConsts } from './core/common/app-constant';




@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private spinner: SpinnerService, private exceptionService: ExceptionService, private router: Router,
    private sharedDataService: ShareDataService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let token = this.sharedDataService.getBearerToken();
    let encryptionToken = AppConsts.message.encryptionToken;

    if (token) {

      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      const isExpired = helper.isTokenExpired(token);
      const expirationDate = helper.getTokenExpirationDate(token);

      if (isExpired) {
        sessionStorage.clear();
        this.router.navigateByUrl('/login');
      }

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
