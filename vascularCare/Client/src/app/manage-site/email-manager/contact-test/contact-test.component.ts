import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import * as moment from 'moment';
import { MailCampaignTextService } from '../email-manager.service';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
@Component({
    templateUrl: './contact-test.component.html',
    selector: 'contact-test',
    styleUrls: ['./contact-test.component.css']
})
export class ContactTestComponent implements OnInit {
    @ViewChild('dt2') table: Table;
    @Input() contactDisplay: boolean;
    @Input() isTesting;
    @Input() mailCampaingId;
    @Input() testEmail;
    @Output() displayChange = new EventEmitter();
    

    constructor(private sharedDataService: ShareDataService, private safePipe: SafePipe, private emailService: MailCampaignTextService

    ) {

    }

    ngOnInit() {
console.log(this.mailCampaingId);

    }


    onClose() {
        this.displayChange.emit(false);
    }

    


}
