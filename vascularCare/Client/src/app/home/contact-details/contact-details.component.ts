import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { NotificationService } from 'src/app/shared/core/common/notification';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { ContactUsDto } from '../contact/contact-us';
import { ContactDetailService } from './contact-details.service';
import {NgxCaptchaService} from '@binssoft/ngx-captcha';
import { CaptchaService } from '../captcha/captcha.service';
import { CaptchaComponent } from '../captcha/captcha/captcha.component';
@Component({
    selector: 'contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.css'],
     providers: [CaptchaService]
})

export class ContactDetailsComponent implements OnInit {
    @ViewChild(CaptchaComponent, {static : true}) child : CaptchaComponent;
    @ViewChild('contactForm') public contactForm: NgForm;
    // @Input() isTesting;
    @Input() mailCampaingId;
    @Input() prepareBatchDto;
    // @Input() testEmail;
    public contactDetail: ContactUsDto;
    submittedError: boolean;
    patientCount: any;

    // captch code
    isCaptcha:boolean;
    captchaStatus:any = '';
  
  captchaConfig:any = {
    type:1, 
    length:6, 
    cssClass:'custom',
    back: {
     stroke:"#2F9688",
     solid:"#f2efd2"
    } , 
    font:{
      color:"#000000", 
      size:"35px"
    }
  };

    constructor(private notify: NotifyService, private contactService: ContactDetailService,
        private commonService: CommonService,private captchaService:CaptchaService) {
           

    }
    ngOnInit(): void {
      
        this.contactDetail = new ContactUsDto();
        this.onGetPatientLocationData();
        
    }
    save(){
    this.child.checkCaptcha();
    if (this.child.isCaptchaStatus == false) {
                this.isCaptcha=false;
                this.submittedError = true;
               //  alert("Opps!\nCaptcha mismatch")
            } else if (this.child.isCaptchaStatus == true)  {
                this.isCaptcha=true;
               //  alert("Success!\nYou are right")
                 this.submittedError = false;
                 if (!this.contactForm || !this.contactForm.valid) {
                     this.submittedError = true;
                     return;
                 }
                 let model = new ContactUsDto();
                 model.name = this.contactDetail.name;
                 model.email = this.contactDetail.email;
                 model.phone = this.contactDetail.phone;
                 model.message = this.contactDetail.message;
                 model.subject = this.contactDetail.subject;
                 model.isTesting = this.contactDetail.isTesting;
                 if(this.mailCampaingId) {
                     model.MailCampaignId= this.mailCampaingId;
                 }
                 if(this.prepareBatchDto){
                     model.isTesting =this.prepareBatchDto.isChecked;
                     model.testEmailRecipents = this.prepareBatchDto.email;
                 }
                 this.contactService.contactUs(model).subscribe(
                     result => {
         
                         this.contactDetail = new ContactUsDto();
                         this.notify.success(AppConsts.message.contactMessage);
                         this.child.captch_input='';
                     });
    
            }
}

    onGetPatientLocationData() {
        this.commonService.getLocationPatientCount().subscribe(res => {
            this.patientCount = res.result.patientCount;
        });
    }

}
