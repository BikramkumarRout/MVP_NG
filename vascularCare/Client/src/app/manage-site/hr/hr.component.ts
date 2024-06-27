import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { MailCampaignTextService } from 'src/app/manage-site/email-manager/email-manager.service';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { NotifyService } from 'src/app/shared/core/common/toast';

@Component({
  selector: 'hr-resume',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})

export class HRComponent implements OnInit {
  @ViewChild('dt2') table: Table;
  isNoRecorsFound;
  locationList;
  listingData: any;
  searchGlobalText: string;
  displayFile: boolean;
  documentId: any;
  currentUser: any;
  isSuperUser: any;
  isSpinnerVisible: boolean;
  folderName: any;
  constructor(private sharedDataService: ShareDataService,private notify: NotifyService, private emailService: MailCampaignTextService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.currentUser = this.sharedDataService.getUserValue();
    this.isSuperUser = this.currentUser.mvpRoleType === "SuperUser"
    this.onGetData();
  }


  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
  }

  onGetData() {
    this.isSpinnerVisible = true;
    this.emailService.getApplicantJobDetails().subscribe(res => {
      this.listingData = res.result;
      this.isSpinnerVisible = false;

    })
  }

  clear(table: Table) {
    table.clear();
    this.searchGlobalText = "";
  }

  onDeleteApplicant(rowData: any) {
    this.confirmationService.confirm({
      message: AppConsts.message.applicantDeleteMessage,
      header: AppConsts.message.mailDeleteHeader,
      icon: '',
      accept: () => {
        this.emailService.DeleteApplicant(rowData, this.currentUser.id).subscribe(
          response => {
            this.onGetData();
            this.notify.success(AppConsts.message.deletedMessage);

          });

      },
      reject: (type) => {

      }
    });
  }
  onShowPreview(value) {
    this.displayFile = true;
    this.documentId = value;
this.folderName = "email-attachment";
  }

  onClosePreview(value) {
    this.displayFile = false;

  }

  customSort(event: any) {
    if (event.field == 'date') {
      event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;
        if (value1 == null && value2 != null)
          result = -1;
        else if (value1 != null && value2 == null)
          result = 1;
        else if (value1 == null && value2 == null)
          result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          value1 = new Date(value1);
        value2 = new Date(value2);
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        return (event.order * result);
      });
    } else {
      event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;
        if (value1 == null && value2 != null)
          result = -1;
        else if (value1 != null && value2 == null)
          result = 1;
        else if (value1 == null && value2 == null)
          result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
        else
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        return (event.order * result);
      });
    }
  }
}

