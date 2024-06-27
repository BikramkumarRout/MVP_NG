import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/manage-site/manage-user/manage-user';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { SettingService } from '../setting.service';
import { ResetPasswordDto } from './reset-password';
@Component({
  templateUrl: './reset-password.component.html',
  selector: 'reset-password',
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordDto:ResetPasswordDto;
  public submittedError: boolean;
  private currentUser: any;

  constructor(private settingService: SettingService, private sharedDataService: ShareDataService) {
   }

  ngOnInit() {
    this.currentUser = this.sharedDataService.getUserValue();
      this.resetPasswordDto= new ResetPasswordDto();
    }

    onSave(resetPasswordForm) {
      if (!resetPasswordForm.valid) {
        this.submittedError = true;
        return;
      }
      this.submittedError = false;
      this.resetPasswordDto.userId = this.currentUser.id;
        this.settingService.resetPassword(this.resetPasswordDto).subscribe(
          result => {
          });
      }
    }

