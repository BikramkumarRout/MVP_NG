import { Component, EventEmitter, Input, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { ManageSiteService } from '../../manage-site.service';
import { NgForm } from '@angular/forms';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from '../../../shared/core/common/app-constant';
import { NotifyService } from 'src/app/shared/core/common/toast/toast.service';
import { NotificationService } from 'src/app/shared/core/common/notification';
import { PhoneFormatPipe } from 'src/app/shared/pipe/phoneNoPipe';
import { MailCampaignManagementService } from '../mail-campaign-management.service';
import { MailCampaginEditDto } from './to-edit/mail-campaign-edit';
@Component({
  templateUrl: './mail-campaign-edit.component.html',
  selector: 'mail-campaign-edit',
  styleUrls: ['./mail-campaign-edit.component.css']
})

export class MailCampaignEditComponent implements OnInit {
  @Input() display: boolean;
  @Input() listingData;
  @Input() rowData;
  @Output() displayChange = new EventEmitter();
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('mailEditForm') public mailEditForm: NgForm;
  public mailCampaginEditDetail: MailCampaginEditDto;

  public header: string;
  public emailList: any;
  public emailExists: any;
  public userId: any;
  public submittedError;
  public selectedFacilities: any[] = [];
  public facilityList: any[];
  public isEditPermission: boolean = false;
  public isSpinnerVisible:boolean;
  private isSaved = false;
  private currentUser: any;
  displayTo: boolean;
  typeId: any;
  mailCampaginId: any;
  result: { id: number; name: any; }[];
  emailRecipientTypeId: any;



  constructor(private mailCampaignManagementService: MailCampaignManagementService, private notificationService: NotificationService,
    private notify: NotifyService, private sharedDataService: ShareDataService, private phoneFormat: PhoneFormatPipe) {
  }

  ngOnInit() {
    this.isEditPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageCorporationsEdit);
    this.currentUser = this.sharedDataService.getUserValue();
    this.mailCampaginEditDetail = new MailCampaginEditDto();
    this.mailCampaginEditDetail.description = this.rowData.description;
  }



  onSave() {
    this.isSpinnerVisible=true;
    this.submittedError = false;
    if (!this.mailEditForm.valid) {
      this.submittedError = true;
      return;
    }
    this.mailCampaginEditDetail.id = this.rowData.id;
    this.mailCampaginEditDetail.userId = this.currentUser.id;
    this.mailCampaignManagementService.saveUpdateMailCampaign(this.mailCampaginEditDetail).subscribe(res => {
      this.notify.success(AppConsts.message.saveMessage);
      this.isSaved = true;
      this.isSpinnerVisible=false;
      setTimeout(() => {
        this.onClose();
      }, 2000);
    })

  }

  onToDialogClose(event) {
    if (!event) {
      this.getUpdateEmailTypeId();

    }
    this.displayTo = event;

  }
  getUpdateEmailTypeId() {
    if (this.typeId === "to") {
      this.emailRecipientTypeId = 1;

    } else if (this.typeId === "cc") {
      this.emailRecipientTypeId = 2;

    } else if (this.typeId === "bcc") {
      this.emailRecipientTypeId = 3;

    }
    this.mailCampaignManagementService.getUpdateMailCampaignType(this.rowData.id, this.emailRecipientTypeId).subscribe(res => {
      this.result = Object.keys(res.result.emails)
        .map(key => ({ id: Number(key), name: res.result.emails[key] }));
      if (this.typeId === "to") {
        this.rowData.to = this.result.map(({ name }) => name);
      }
      else if (this.typeId === "cc") {
        this.rowData.cc = this.result.map(({ name }) => name);
      } else if (this.typeId === "bcc") {
        this.rowData.bcc = this.result.map(({ name }) => name);
      }
    })
  }
  onToShowDialog(value, typeId) {
    this.displayTo = true;
    this.rowData = value;
    this.typeId = typeId;
    this.listingData = this.listingData;
  }

  onClose() {
    if (this.mailEditForm.dirty && !this.isSaved) {
      this.notificationService.activate(AppConsts.message.notification_Default_ValidationText, AppConsts.message.notification_Default_Message, AppConsts.message.notification_Default_OkButton).then(responseOK => {
        if (responseOK) {
          this.displayChange.emit(false);
        }
      });
    }
    else if (!this.mailEditForm.dirty) {
      this.displayChange.emit(false);
    } else {
      this.displayChange.emit(true);
    }
  }


}
