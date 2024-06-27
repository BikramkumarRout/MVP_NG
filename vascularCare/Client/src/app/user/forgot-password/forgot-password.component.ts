import { Component, OnInit } from "@angular/core";
import { ForgotPasswordDto, PasswordDto } from "./forgot-password";
import { LoginService } from "../login.service";
import { NotifyService } from "src/app/shared/core/common/toast";
import { ActivatedRoute, Router } from "@angular/router";
import { ShareDataService } from "src/app/shared/core/common/sharedDataService";
import { AppConsts } from "src/app/shared/core/common/app-constant";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordDto: ForgotPasswordDto;
  public submittedError: boolean;
  constructor(
    private loginService: LoginService,
    private notifyService: NotifyService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private sharedDataService: ShareDataService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.forgotPasswordDto = new ForgotPasswordDto();
    let encryptedUserId = this._activatedRoute.snapshot.queryParams["6CCB21214FFD60B0FC2C1607CF6A05BE6A0FED9C74819EB6A92E1BD6717B28EB"];
    encryptedUserId = encryptedUserId.toString().replace(" ", "+");
    let decryptedUserId = this.sharedDataService.decrypt(
      AppConsts.encryptionDecryption.key,
      encryptedUserId
    );    
    this.forgotPasswordDto.userId = decryptedUserId;
  }

  onSavePassword(forgotPasswordForm) {
    if (!forgotPasswordForm.valid) {
      this.submittedError = true;
      return;
    }
    this.submittedError = false;
    let model = new PasswordDto();

    model.password = this.sharedDataService.encryptData(
      this.forgotPasswordDto.password
    );
    model.userId = +this.forgotPasswordDto.userId;
    this.forgotPassword(model).subscribe((result) => {
      if (result.statusCode == 400) {
        this.notifyService.error("Please enter correct email.");
      } else {       
        this.router.navigate(["//login"]);
      }
    });
  }

  forgotPassword(model): Observable<any>{    
    let url_ = AppConsts.apiUrl.forgotPassword;
    return this.http.post(url_,model, AppConsts.httpOptions)
  }
}
