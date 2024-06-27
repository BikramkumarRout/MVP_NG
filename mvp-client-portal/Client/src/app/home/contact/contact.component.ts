import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { CaptchaService } from '../captcha/captcha.service';
import { CaptchaComponent } from '../captcha/captcha/captcha.component';
import { ContactDto } from './contact';
import { ContactService } from './contact.service';

declare var $: any;
@Component({
    selector: 'home-contact',
    templateUrl: './contact.component.html',
})

export class ContactComponent implements OnInit {
    @ViewChild(CaptchaComponent, {static : true}) child : CaptchaComponent;
    public contactDto: ContactDto;
    public submittedError: boolean;
    public locations: any;
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
    constructor(private contactService: ContactService,private captchaService: CaptchaService, private notifyService: NotifyService) { }

    ngOnInit(): void {

        // let objDiv = document.getElementById("customScroll");
        //objDiv.scrollTop = objDiv.scrollHeight;
        this.contactDto = new ContactDto();
    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }


    onSendMessage(contactForm) {
        this.child.checkCaptcha();
        if (!contactForm.valid) {
            this.submittedError = true;
            return;
        }
        if (this.child.isCaptchaStatus == false) {
            this.isCaptcha = false;
            this.submittedError = true;
            //  alert("Opps!\nCaptcha mismatch")
        } else if (this.child.isCaptchaStatus == true) {
            this.isCaptcha = true;
            //  alert("Success!\nYou are right")
            this.submittedError = false;
        
        
        let model = new ContactDto();
        model.name = this.contactDto.name;
        model.email = this.contactDto.email;
        model.phone = this.contactDto.phone;
        model.message = this.contactDto.message;
        this.contactService.contactUs(model).subscribe(
            result => {
                this.notifyService.success("Message sent successfully.");
                this.contactDto = new ContactDto();
            });
    }
    }
}
