import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { CaptchaService } from '../captcha/captcha.service';
import { CaptchaComponent } from '../captcha/captcha/captcha.component';
import { ContactDto } from '../contact/contact';
import { ContactService } from '../contact/contact.service';

@Component({
    selector: 'help-form',
    templateUrl: './help.component.html',
    providers: [CaptchaService]
})

export class HelpFormComponent implements OnInit {
    @ViewChild(CaptchaComponent, { static: true }) child: CaptchaComponent;
    @ViewChild('contactForm') public contactForm: NgForm;
    public contactDetail: ContactDto;
    submittedError: boolean;
    patientCount: any;
    // captch code
    isCaptcha: boolean;
    captchaStatus: any = '';

    captchaConfig: any = {
        type: 1,
        length: 6,
        cssClass: 'custom',
        back: {
            stroke: "#2F9688",
            solid: "#f2efd2"
        },
        font: {
            color: "#000000",
            size: "35px"
        }
    };
    constructor(private contactService: ContactService, private captchaService: CaptchaService, private notify: NotifyService, private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.contactDetail = new ContactDto();
        this.onGetPatientLocationData();
    }

    save() {
        this.child.checkCaptcha();
        if (this.child.isCaptchaStatus == false) {
            this.isCaptcha = false;
            this.submittedError = true;
            //  alert("Opps!\nCaptcha mismatch")
        } else if (this.child.isCaptchaStatus == true) {
            this.isCaptcha = true;
            //  alert("Success!\nYou are right")
            this.submittedError = false;
            if (!this.contactForm || !this.contactForm.valid) {
                this.submittedError = true;
                return;
            }
            let model = new ContactDto();
            model.name = this.contactDetail.name;
            model.email = this.contactDetail.email;
            model.phone = this.contactDetail.phone;
            model.message = this.contactDetail.message;
            model.subject = this.contactDetail.subject;
            this.contactService.contactUs(model).subscribe(
                result => {

                    this.contactDetail = new ContactDto();
                    this.notify.success(AppConsts.message.contactMessage);
                });

        }

    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

    onGetPatientLocationData() {
        this.commonService.getLocationPatientCount().subscribe(res => {
            this.patientCount = res.result.patientCount;
        });
    }
}
