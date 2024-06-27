
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';


import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { MailCampaignManagementService } from '../../mail-campaign-management.service';
import { ConfirmationService } from 'primeng/api';
import { RecipientDto } from '../../recipient';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/shared/core/common/notification';
import { NotifyService } from 'src/app/shared/core/common/toast';

@Component({
  templateUrl: './to-edit.component.html',
  selector: 'to-edit',
  styleUrls: ['./to-edit.component.css']
})
export class ToEditComponent implements OnInit, OnChanges {
  @ViewChild('recipientEditForm') public recipientEditForm: NgForm;

  @Output() displayChangeTo = new EventEmitter();
  @ViewChild('dt2') table: Table;
  @Input() listingData;
  @Input() rowData;
  @Input() typeId;
  public recipientDetail: RecipientDto;
  displayTo: boolean = true;

  public searchGlobalText;
  isNoRecorsFound: boolean = false;
  isEditPermission: boolean;
  nameFilter: any;
  emailFilter: any;
  reuestTypes: string;
  facilityId: number;
  sorting: string;
  sortingType: string;
  toFilter: any;
  bccFilter: any;
  ccFilter: any;
  descriptionFilter: any;
  isNewRecipient: any;
  submittedError: boolean;
  currentUser: any;
  name: string;
  header: any;
  obj: any;
  result: { id: number; name: any; }[];
  isSaved: any;
  maiiCampaignId: any;
  recipientTypeId: any;
  constructor(private sharedDataService: ShareDataService, private notificationService: NotificationService,
    private commonService: CommonService, private confirmationService: ConfirmationService,
    private mailCampaignManagementService: MailCampaignManagementService, private notify: NotifyService) {

  }

  ngOnInit() {
    this.currentUser = this.sharedDataService.getUserValue();
    this.isEditPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageUsersEdit);
    this.reuestTypes = "To Edit";
    this.recipientDetail = new RecipientDto();

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onGetMailList();
    console.log(this.typeId, "edit");
    console.log(this.rowData, "rowData");


    if (this.typeId === "to") {
      this.header = 'TO Mail Recipient Edit';
      this.recipientTypeId = 1;
    } else if (this.typeId === "cc") {
      this.header = 'CC Mail Recipient Edit';
      this.recipientTypeId = 2;

    } else {
      this.header = 'BCC Mail Recipient Edit';
      this.recipientTypeId = 3;

    }
  }

  onGetMailList() {
    if (this.rowData) {
      if (this.typeId === "to" && this.rowData.to) {
        if (this.rowData.to.length > 0 && typeof (this.rowData.to) !== 'string') {
          this.result = this.rowData.to;
          let mailList = [];
          this.result.forEach((value, i) => {
            mailList.push({ id: i, name: value });
          });
          this.result = mailList;
        } else if (typeof (this.rowData.to) === 'string') {
          let mailList = this.rowData.to.split(',');
          this.result = Object.keys(mailList)
            .map(key => ({ id: Number(key), name: mailList[key] }));
        }
        } else if (this.typeId === "cc" && this.rowData.cc) {
          let mailList;
          if (this.rowData.cc.length > 0 && typeof (this.rowData.cc) !== 'string') {
            this.result = this.rowData.cc;
            let mailList = [];
            this.result.forEach((value, i) => {
              mailList.push({ id: i, name: value });
            });
            this.result = mailList;
          } else if (typeof (this.rowData.cc) === 'string') {
            mailList = this.rowData.cc.split(',');
            this.result = Object.keys(mailList)
              .map(key => ({ id: Number(key), name: mailList[key] }));
          }
        } else if (this.typeId === "bcc" && this.rowData.bcc) {

          if (this.rowData.bcc.length > 0 && typeof (this.rowData.bcc) !== 'string') {
            this.result = this.rowData.bcc;
            let mailList = [];
            this.result.forEach((value, i) => {
              mailList.push({ id: i, name: value });
            });
            this.result = mailList;
          } else if (typeof (this.rowData.bcc) === 'string') {
            let mailList = this.rowData.bcc.split(',');
            this.result = Object.keys(mailList)
              .map(key => ({ id: Number(key), name: mailList[key] }));
          }
        }
      //}
    }
  }

  onNewRecipientClick(event) {
    this.recipientDetail = new RecipientDto();
    this.name = '';
    if (event) {
      this.isNewRecipient = true;
    }

  }

  onBack() {
    this.isNewRecipient = false;

  }


  onCloseTo() {
    this.displayChangeTo.emit(false);
    // this.displayTo = false;

  }



  clear(table: Table) {
    table.clear();
    this.searchGlobalText = "";
  }

  public onFilter(event): void {
    this.nameFilter = event.filters.name[0].value;
    this.descriptionFilter = event.filters.description[0].value;
    this.toFilter = event.filters.to[0].value;
    this.ccFilter = event.filters.cc[0].value;
    this.bccFilter = event.filters.bcc[0].value;

  }


  onDeleteMail(value: any) {
    this.confirmationService.confirm({
      message: AppConsts.message.mailDeleteMessage,
      header: AppConsts.message.mailDeleteHeader,
      icon: '',
      accept: () => {
        value.userId = this.currentUser.id;
        if (this.typeId === "to") {
          value.EmailRecipientTypeId = 1;

        } else if (this.typeId === "cc") {
          value.EmailRecipientTypeId = 2;

        } else {
          value.EmailRecipientTypeId = 3;

        }
        value.id = this.rowData.id;
        this.mailCampaignManagementService.DeleteEmail(value.id, value.userId, value.name, value.EmailRecipientTypeId).subscribe(
          response => {
            this.getUpdateEmailTypeId();
            this.notify.success(AppConsts.message.deletedMessage);
          });

      },
      reject: (type) => {

      }
    });
  }


  onRecipientSave() {
    this.submittedError = false;
    if (!this.recipientEditForm.valid) {
      this.submittedError = true;
      return;
    }
    if (this.typeId === "to") {
      this.recipientDetail.emailRecipientTypeId = 1;

    } else if (this.typeId === "cc") {
      this.recipientDetail.emailRecipientTypeId = 2;

    } else {
      this.recipientDetail.emailRecipientTypeId = 3;

    }

    this.recipientDetail.mailCampaignId = this.rowData.id;
    this.recipientDetail.userId = this.currentUser.id;
    this.mailCampaignManagementService.saveUpdateEmails(this.recipientDetail).subscribe(res => {
      if(res.result == false)
      {
        this.notify.error(AppConsts.message.duplicateEmail);
      }
      else
      {
      this.isSaved = true;
      this.isNewRecipient = false;
      this.getUpdateEmailTypeId();
      }
    })

  }

  getUpdateEmailTypeId() {
    this.mailCampaignManagementService.getUpdateMailCampaignType(this.rowData.id, this.recipientTypeId).subscribe(res => {
      this.result = Object.keys(res.result.emails)
        .map(key => ({ id: Number(key), name: res.result.emails[key] }));;
    })
  }
}


