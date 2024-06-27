
import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/manage-site/manage-user/manage-user';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { SettingService } from '../setting.service';
import { ResetPasswordDto } from './reset-password';
@Component({
  templateUrl: './reset-password.component.html',
  selector: 'reset-password',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordDto: ResetPasswordDto;
  public submittedError: boolean;
  private currentUser: any;

  constructor(private settingService: SettingService, private notify: NotifyService, private sharedDataService: ShareDataService) {
  }

  ngOnInit() {
    this.currentUser = this.sharedDataService.getUserValue();
    this.resetPasswordDto = new ResetPasswordDto();
  }

  onSave(resetPasswordForm) {
    if (!resetPasswordForm.valid) {
      this.submittedError = true;
      return;
    }
    this.submittedError = false;
    let model = new ResetPasswordDto();
    model.currentPassword = this.sharedDataService.encryptData(this.resetPasswordDto.currentPassword);
    model.userId = this.currentUser.id;
    model.password = this.sharedDataService.encryptData(this.resetPasswordDto.password);
    model.confirmPassword = this.sharedDataService.encryptData(this.resetPasswordDto.confirmPassword);
    this.settingService.resetPassword(model).subscribe(
      (res) => {
        if(res.result == false)
        {
          this.notify.error("Current password is wrong.");
        }
        else{
        this.notify.success("Your password has updated.");
        this.resetPasswordDto = new ResetPasswordDto();
        }
      },
      (err) => {
        console.log('errorHttp404 ERROR', err);

      });
  };

}
