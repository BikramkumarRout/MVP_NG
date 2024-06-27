
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';

import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { MailCampaignTextService } from '../email-manager.service';
import { PrepareBatchDto } from './prepare-batch';
import { NgForm } from '@angular/forms';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { JobsDto } from 'src/app/home/careers/jobs/edit-jobs/jobs';
import { CareersService } from 'src/app/home/careers/careers.service';
import { MailCampaignsDto } from '../email-manager';

@Component({
    templateUrl: './prepare-batch.component.html',
    selector: 'prepare-batch',
    styleUrls: ['./prepare-batch.component.css']
})
export class PrepareBatchComponent implements OnInit {
    @Input() display: boolean;
    @Output() displayChange = new EventEmitter();
    @ViewChild('dt2') table: Table;
    @ViewChild('prepareBatchForm') public prepareBatchForm: NgForm;
    selectedCampaign;
    listing: any;
    radioSelected: any;
    public prepareBatchDto: PrepareBatchDto;
    submittedError: boolean;
    currentUser: any;
    name: any;
    mailCampaingId: any;
    email: string;
    id: any;
    isChecked: boolean;
    applicantList: any;
    selectedApplicant: any;
    batch;
    applicantId: number;
    displayResume: boolean;
    mailcampaignType: string;
    selectedfacesheet: any;
    listingData: any;
    selectedRows;
    displayFile: boolean;
    documentId: any;
    isNoRecorsFound;
    searchGlobalText;
    checked: boolean = false;
    value: boolean = false;
    rowData;
    submittedError1: boolean;
    jobDetails: JobsDto;
    loginDisplay: boolean;
    jobListingData: any;
    isSpinnerVisible: boolean;
    serialNo: any;
    jobTitle: any;
    datePosted: any;
    location: any;
    showJobDetail: any;
    jobData: any;
    testEmail: string;
    isTesting: boolean = true;
    contactDisplay: boolean;
    hideSave: any;
    isActive: number;
    //selectedApplicant: any;
    constructor(private notify: NotifyService, private sharedDataService: ShareDataService,
        private emailService: MailCampaignTextService, private careerService: CareersService,
        private msalAuthService: MsalService

    ) {

    }

    ngOnInit() {
        this.loginDisplay = this.msalAuthService.instance.getAllAccounts().length > 0;
        this.currentUser = this.sharedDataService.getUserValue();
        this.onGetEmailText();
        this.jobDetails = new JobsDto();
        this.prepareBatchDto = new PrepareBatchDto();
        this.onGetData();

    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     this.testEmail = this.prepareBatchDto.email;
    // }

    onGetJobs() {
        if(this.loginDisplay){
            this.isActive = 0;
        }else{
            this.isActive = 1;

        }
        this.isSpinnerVisible = true;
        this.careerService.getJobs(this.isActive).subscribe((response) => {
            if (!this.loginDisplay) {
                this.jobListingData = response.result.filter(res => res.status === 1);
            } else {
                this.jobListingData = response.result;
            }
            this.isNoRecorsFound = response.result.length === 0;
            this.isSpinnerVisible = false;

        });
    }

    onFilter(event) {
        this.serialNo = event.filters.siNo[0].value;
        this.jobTitle = event.filters.jobTitle[0].value;
        this.location = event.filters.location[0].value;
        this.datePosted = event.filters.datePosted[0].value;
    }

    // selectedRow(value) {
    //     this.selectedApplicant = value;

    // }

    clear(table: Table) {
        table.clear();
        this.searchGlobalText = "";
    }

    onGetData() {
        this.emailService.getApplicantJobDetails().subscribe(res => {
            this.listingData = res.result;
            console.log(this.listingData);
            
        })
    }

    onClose() {
        this.displayChange.emit(false);
    }

    onSave() {
        this.submittedError = false;
        if (!this.prepareBatchForm.valid) {
            this.submittedError = true;
            return;
        }
        this.name = this.selectedCampaign.name;
        this.mailCampaingId = this.selectedCampaign.id;
        this.email = this.prepareBatchDto.email;
        this.id = this.currentUser.id;
        this.isChecked = this.prepareBatchDto.isChecked;
        if (this.mailcampaignType === "Resume") {
            if (!this.selectedApplicant) {
                this.submittedError1 = true;
                this.notify.error(AppConsts.message.applicantMessage);
            }
            this.applicantId = this.selectedApplicant.siNo;
if(this.mailcampaignType === "Resume" && !this.isChecked) {
    this.applicantId = this.selectedApplicant.id;

}
        }
        else if (this.mailcampaignType === "New Face Sheet") {
            this.applicantId = this.selectedfacesheet.value;
        }
        this.emailService.prepareBatch(this.mailCampaingId, this.name, this.email, this.isChecked, this.id, this.applicantId).subscribe(res => {
            this.onClose()
        })
    }

    onGetEmailText() {
        this.emailService.getMailCampaignText().subscribe(res => {
            let mailCampaigns : Array<MailCampaignsDto> =res.result.map((campaign)=>{
                return {id: campaign.id, name:campaign.name, description:campaign.description}
        
        });
              
              mailCampaigns = this.getPermissionMailCampaigns(mailCampaigns);
              this.listing = mailCampaigns;
            
            
        })
    }

    onCheckBatch(event) {
        if (event.target.checked) {
            this.isChecked = true;
        } else {
            this.isChecked = false;
        }
    }

    onSelectCampagin(event) {
        this.onGetData();
        this.mailcampaignType = event.value.name;

        if (this.mailcampaignType === "Resume") {
            this.onGetJobs();
            this.applicantList = true;
        } else if (this.mailcampaignType === "New Face Sheet") {
            this.onGetFacesheets();
        }  else if (this.mailcampaignType === "Contact Us") {
            this.hideSave = true;
        } 
        else {
            this.applicantList = false;
        }
        this.mailCampaingId = this.selectedCampaign.id;
    }

    onShowContact() {
        this.testEmail = this.prepareBatchDto.email;
        this.isTesting = this.prepareBatchDto.isChecked;
        this.contactDisplay = true;

    }

    onHideContact(event) {
        this.contactDisplay = event;
    }
    onGetFacesheets() {
        this.emailService.onGetFacesheets().subscribe(res => {
            this.batch = res.result;
        })
    }
    onGetApplicants() {
        this.emailService.getApplicants().subscribe(res => {
            this.batch = res.result;
        })
    }

    onShowResumeList() {
        this.displayResume = true;
    }

    oncloseResumeList(event) {
        this.displayResume = false;

    }

    onShowPreview(value) {
        this.displayFile = true;
        this.documentId = value;

    }


    onClosePreview(value) {
        this.displayFile = false;

    }

    onJobSelect(value) {
        this.testEmail = this.prepareBatchDto.email;
        this.isTesting = this.prepareBatchDto.isChecked;
        this.showJobDetail = true;
        this.jobData = value;

    }
    onDetailDialogClose(event) {
        this.showJobDetail = false;

    }
    private getPermissionMailCampaigns(mailCampaigns: MailCampaignsDto[]) {
        let resumePermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesResumeEdit);
        if (!resumePermission) {
          resumePermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesResumeView);
        }
        if (!resumePermission) {
          mailCampaigns.splice(mailCampaigns.findIndex(item => item.name === 'Resume'), 1);   
       
        }
        let newFaceSheetPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesNewfacesheetEdit);
        if (!newFaceSheetPermission) {
          newFaceSheetPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesNewfacesheetView);
        }
        if (!newFaceSheetPermission) {
          mailCampaigns.splice(mailCampaigns.findIndex(item => item.name === 'New Face Sheet'), 1); 
        }
        let contatUsPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesContactusEdit);
        if (!contatUsPermission) {
          contatUsPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesContactusView);
        }
        if (!contatUsPermission) {
          mailCampaigns.splice(mailCampaigns.findIndex(item => item.name === 'Contact us'), 1); 
          
        }
        return mailCampaigns;
      }
}
