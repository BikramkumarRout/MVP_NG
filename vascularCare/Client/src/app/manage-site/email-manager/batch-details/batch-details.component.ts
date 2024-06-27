
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';


import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { MailCampaignTextService } from '../email-manager.service';
import { NgForm } from '@angular/forms';
import { NotifyService } from 'src/app/shared/core/common/toast';

@Component({
    templateUrl: './batch-details.component.html',
    selector: 'batch-details',
    styleUrls: ['./batch-details.component.css']
})
export class BatchDetailsComponent implements OnInit {
    @Input() displayDetails: boolean;
    @Input() rowData;
    @Output() displayDetailChange = new EventEmitter();
    selectedCountries1;
    listing: any;
    radioSelected: any;
    submittedError: boolean;
    currentUser: any;
    name: any;
    mailCampaingId: any;
    email: string;
    id: any;
    isChecked: boolean;
    applicantList: any;
    selectedApplicant;
    batch;
    applicantId: number;
    message: [] = [];
    userId: any;
    displayFile: boolean;
    documentId: any;
    folderName: string;
    constructor(private sharedDataService: ShareDataService, private notify: NotifyService,
        private emailService: MailCampaignTextService

    ) {

    }

    ngOnInit() {
        this.currentUser = this.sharedDataService.getUserValue();
    }
    onShowPreview(value) {
        this.displayFile = true;
        this.documentId = value;
        this.folderName = "email-attachment";
    }

    onClosePreview(value) {
        this.displayFile = false;

    }

    onClose() {
        this.displayDetailChange.emit(false);
    }



    sendMail() {

        this.message = this.rowData.id;
        let messageId = [];
        messageId.push(this.message);

        this.userId = this.currentUser.id;
        this.emailService.sendMessages(messageId, this.userId).subscribe(res => {
            this.notify.success(AppConsts.message.sentMessage);
            setTimeout(() => {
                this.onClose();
            }, 1000);

        });
    }



}
