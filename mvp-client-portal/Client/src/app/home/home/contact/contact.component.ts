import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { ContactDto } from './contact';
import { ContactService } from './contact.service';
 
declare var $: any;
@Component({
    selector: 'home-contact',
    templateUrl: './contact.component.html',
})

export class ContactComponent implements OnInit {
    public contactDto: ContactDto;
    public submittedError: boolean;
    public locations: any;

    constructor(private contactService: ContactService, private notifyService: NotifyService ) { }

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
        if (!contactForm.valid) {
            this.submittedError = true;
            return;
        }
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
