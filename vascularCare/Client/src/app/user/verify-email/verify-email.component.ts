import { Component, OnInit } from '@angular/core';
import { VerifyEmailDto } from './verify-email';
import { LoginService } from '../login.service';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { Router } from '@angular/router';

@Component({
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.css']
})

export class VerifyEmailComponent implements OnInit {
    public verifyEmailDto: VerifyEmailDto;
    public submittedError: boolean;

    constructor(private loginService: LoginService, private notifyService: NotifyService,
        private router: Router) { }

    ngOnInit(): void {
        this.verifyEmailDto = new VerifyEmailDto();
    }

    onSendPassword(verfiyEmailForm) {
        if (!verfiyEmailForm.valid) {
            this.submittedError = true;
            return;
        }
        this.submittedError = false;
        this.loginService.verifyEmail(this.verifyEmailDto).subscribe(
            result => {
                if (result.statusCode == 400) {
                    this.notifyService.error("Please enter correct email.");
                }
                else {
                    this.router.navigate(['/login']);
                }
            });
    }
}
