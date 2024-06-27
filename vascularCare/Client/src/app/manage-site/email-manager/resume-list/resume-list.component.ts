import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import * as moment from 'moment';
import { MailCampaignTextService } from '../email-manager.service';
@Component({
  templateUrl: './resume-list.component.html',
  selector: 'resume-list',
  styleUrls: ['./resume-list.component.css']
})
export class resumeListComponent implements OnInit {
  @ViewChild('dt2') table: Table;
  @Input() displayResume: boolean;
  @Output() displayChange = new EventEmitter();
  public listingData;
  public searchGlobalText;
  isNoRecorsFound: boolean = false;
  isEditPermission: boolean;
  stateList;
  item: any;
  elements: any[];
  form: any;
  rangeDates: Date[];
  selectedCampaign = [];
  selectedStatus = [];
  selectedType = [];
  countries;
  listing = [];
  status;
  batch;
  today;
  currentDate: string;
  userId: any;
  currentUser: any;
  mailCampaingId: any;
  types: any;
  statusId: any;
  selectedTypeId: any[];
  selectedStatusId: any[];
  isChecked: boolean;
  startDate: Date;
  endDate: Date;
  displayDetails: any;
  selectedRows: any[];
  rowData: any;
  displayFile;
  documentId: number;
  constructor(private sharedDataService: ShareDataService, private emailService: MailCampaignTextService

  ) {

  }

  ngOnInit() {
    this.onGetData();

  }

  onShowPreview(value) {
    this.displayFile = true;
    this.documentId = value;

  }


  onClosePreview(value) {
    this.displayFile = false;

  }

  onClose() {
    this.displayChange.emit(false);
  }

  clear(table: Table) {
    table.clear();
    this.searchGlobalText = "";
  }

  onGetData() {
    this.emailService.getApplicantJobDetails().subscribe(res => {
      this.listingData = res.result;
    })
  }

  onGetEmailText() {
    this.emailService.getMailCampaignText().subscribe(res => {
      this.listing = res.result;
      this.listing.map((item) => this.selectedCampaign.push(item));
      this.mailCampaingId = this.selectedCampaign.map(a => a.id);
    })
  }





  onCheckCampaign(event) {
    if (event.length == 0) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }






  selectAllRow(checkValue) {
    if (checkValue) {
      this.selectedRows = this.listingData.filter(value => value.id);
      this, this.isChecked = true;
    } else {
      this.selectedRows = [];
      this.isChecked = false;

    }
  }

}
