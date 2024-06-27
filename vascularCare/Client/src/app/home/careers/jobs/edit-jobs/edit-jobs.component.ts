import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { CareersService } from '../../careers.service';
import { JobsDto } from './jobs';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { NotificationService } from 'src/app/shared/core/common/notification';

@Component({
    selector: 'edit-jobs',
    templateUrl: './edit-jobs.component.html',
    styleUrls: ['./edit-jobs.component.css']
})

export class EditJobsComponent implements OnInit {
    @ViewChild('dt2') table: Table;
    @ViewChild('jobForm') public jobForm: NgForm;
    @Input() displayEdit: boolean;
    @Input() listingData;
    @Input() jobDetails: JobsDto;
    @Output() displayEditChange = new EventEmitter();
    header: string;
    currentUser: any;
    submittedError;
    text;
    isSpinnerVisible: boolean;
    loginDisplay: boolean;
    isSaved: any;
    constructor(private msalAuthService: MsalService,private careerService: CareersService,
        private sharedDataService: ShareDataService,private notificationService: NotificationService,) {

    }
    ngOnInit(): void {
        this.loginDisplay = this.msalAuthService.instance.getAllAccounts().length > 0;
        
        this.currentUser = this.sharedDataService.getUserValue();
        if (this.jobDetails.id === 0) {
            this.header = 'Create Jobs';
        } else {
            this.header = 'Edit Jobs';
        }

    }
    onClose() {
        this.jobDetails = new JobsDto();
        if (this.jobForm.dirty && !this.isSaved) {
            this.notificationService
              .activate(
                AppConsts.message.notification_Default_ValidationText,
                AppConsts.message.notification_Default_Message,
                AppConsts.message.notification_Default_OkButton
              )
              .then((responseOK) => {
                if (responseOK) {
                  this.displayEditChange.emit(false);
                }
              });
          } else if (!this.jobForm.dirty) {
            this.displayEditChange.emit(false);
          } else {
            this.displayEditChange.emit(true);
          }
    }
    onSave() {
        this.submittedError = false;
        if (!this.jobForm.valid) {
            this.submittedError = true;
            return;
        }
        let jobDetail = new JobsDto();
        jobDetail.datePosted = this.jobDetails.datePosted;
        jobDetail.userId = 73;
        jobDetail.id = this.jobDetails.id;
        jobDetail.jobDescription = this.jobDetails.jobDescription;
        jobDetail.jobTitle = this.jobDetails.jobTitle;
        jobDetail.location = this.jobDetails.location;
        jobDetail.siNo = this.jobDetails.siNo;
        jobDetail.status = this.jobDetails.status;
        jobDetail.userEmail =this.msalAuthService.instance.getAllAccounts()[0].username;
        jobDetail.firstName =this.msalAuthService.instance.getAllAccounts()[0].name;
        
        this.isSpinnerVisible = true;

        if (+this.jobDetails.id === 0) {
            this.careerService.saveUpdateJobs(jobDetail).subscribe((result) => {
                this.isSpinnerVisible = false;
                this.isSaved= true;
                this.onClose();
            });
        } else {
            this.careerService.saveUpdateJobs(jobDetail).subscribe((result) => {
                this.isSpinnerVisible = false;
                this.isSaved= true;
                this.onClose();

            });
        }

    }





}
