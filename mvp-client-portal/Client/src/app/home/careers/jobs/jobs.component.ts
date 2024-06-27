import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CareersService } from '../careers.service';
import { ConfirmationService } from 'primeng/api';

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
    display:boolean;
    listingData;
    isSpinnerVisible: boolean;
    loginData;
    displayEdit;
    header: string;
    loginDisplay:boolean = false;
    public portalFooter: boolean = true;

    constructor(private confirmationService: ConfirmationService,private careerService: CareersService) {

    }
    ngOnInit(): void {
        this.reuestTypes = "Jobs";
        this.onGetJobs();
    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
    onGetJobs() {
        this.isSpinnerVisible = true;
        this.careerService.getJobs().subscribe((response) => {
            this.jobsList = response.result;
            this.isNoRecorsFound = response.result.length === 0;
            this.isSpinnerVisible = false;
        });
    }

    showDialog(event?) {
        this.display = true;
        this.listingData = event;
    }

   

    onDetailDialogClose(event) {
        this.display = false;

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

    
    
    onExport() {

    }
}
