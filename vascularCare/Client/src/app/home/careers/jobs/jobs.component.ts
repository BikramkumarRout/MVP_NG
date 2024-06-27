import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CareersService } from '../careers.service';
import { JobsDto } from './edit-jobs/jobs';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { ConfirmationService } from 'primeng/api';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';

@Component({
    selector: 'pm-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements OnInit {
    @ViewChild('dt2') table: Table;
    jobsList: any;
    searchGlobalText;
    isNoRecorsFound;
    reuestTypes: string;
    datePosted;
    location;
    jobTitle;
    serialNo;
    display: boolean;
    listingData: JobsDto[] = [];
    isSpinnerVisible: boolean;
    loginData;
    displayEdit;
    header: string;
    jobDetails: JobsDto;
    loginDisplay: boolean = false;
    public portalFooter: boolean = true;
    jobListingData: any;
    isActive: any;
    isHrPermission: boolean = true;

    constructor(private sharedDataService: ShareDataService, private confirmationService: ConfirmationService, private careerService: CareersService, private msalAuthService: MsalService,) {

    }
    ngOnInit(): void {
        this.isHrPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesHrView);
        if (this.isHrPermission != true) {
            this.isHrPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesHrEdit);
        }
        this.loginDisplay = this.msalAuthService.instance.getAllAccounts().length > 0;
        this.reuestTypes = "Jobs";
        this.jobDetails = new JobsDto();
        this.onGetJobs();
    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
    onGetJobs() {
        if (this.loginDisplay) {
            this.isActive = 0;
        } else {
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

    onShowHideJob(row, value) {
        let adInstance = this.msalAuthService.instance.getAllAccounts()[0];
        row.email = adInstance.username;
        row.userEmail = adInstance.username;
        row.status = value;
        this.careerService.saveUpdateJobs(row).subscribe((result) => {
            this.isSpinnerVisible = false;


        });
    }

    showDialog(event?) {
        this.display = true;
        this.listingData = event;
    }

    showEditJobDialog(jobDetails?) {
        this.jobDetails = jobDetails;
        this.displayEdit = true;
        this.listingData = jobDetails;
    }

    onDetailDialogClose(event) {
        this.display = false;

    }
    onDialogClose(event) {

        this.displayEdit = false;
        if (event) {
            this.onGetJobs();
        }
        this.jobDetails = new JobsDto();

    }

    onFilter(event) {
        this.serialNo = event.filters.siNo[0].value;
        this.jobTitle = event.filters.jobTitle[0].value;
        this.location = event.filters.location[0].value;
        this.datePosted = event.filters.datePosted[0].value;
    }

    clear(table: Table) {
        table.clear();
        this.searchGlobalText = "";
    }

    onDeleteJob(rowData: any) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this job?',
            header: 'Confirm Delete',
            icon: '',
            accept: () => {
                this.careerService.DeleteJob(rowData.id).subscribe(
                    response => {
                        this.onGetJobs();
                    });

            },
            reject: (type) => {

            }
        });
    }

    onExport() {

    }
}
