import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageSiteService } from '../manage-site.service';
import { Table } from 'primeng/table';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { MailCampaignTextService } from './email-manager.service';
import * as moment from 'moment';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { DatePipe } from '@angular/common';
import { MailCampaignsDto } from './email-manager';


@Component({
  templateUrl: './email-manager.component.html',
  selector: 'email-manager',
  styleUrls: ['./email-manager.component.css']
})
export class EmailManagerComponent implements OnInit {
  @ViewChild('dt2') table: Table;
  public display: boolean = false;
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
  message: any;
  dateValue;
  isSpinnerVisible: boolean;
  backdate: Date;
  hideBatchDropdown: boolean;
  ishide: any;
  constructor(private sharedDataService: ShareDataService, private emailService: MailCampaignTextService,
    private notify: NotifyService,private datePipe: DatePipe

  ) {


    this.status = [
      { name: "Draft", code: 0 },
      { name: "Sent", code: 1 },

    ];
    this.status.map((item) => this.selectedStatus.push(item));
    this.batch = [
      { name: 'Test', code: 1 },
      { name: 'Real', code: 0 },
    ];
    let result = this.batch.filter(obj => {
      return obj.code === 0
    })
    // let initialBatch= this.batch.find(x => x.code === 0);
    result.map((item) => this.selectedType.push(item));
    this.today = new Date().toLocaleDateString();

  }

  ngOnInit() {
    this.currentUser = this.sharedDataService.getUserValue();
    if(this.currentUser.role ==="SuperUser"){
      this.hideBatchDropdown = true;
    }     
    this.startDate = new Date();
    this.backdate = new Date(this.startDate.setDate(this.startDate.getDate() - 30));
    this.backdate.setHours(0, 0, 0, 0);    
    this.endDate = new Date();
    this.endDate.setHours(23, 59, 59, 999);
    this.currentUser = this.sharedDataService.getUserValue();
    this.currentDate = moment().endOf("day").format();
    this.onGetEmailText();
    if(this.currentUser.mvpRoleType ==="SuperUser"){
      this.ishide = true;
    
    }else if((this.currentUser.mvpRoleType !="SuperUser")){
      let grantedPermission = JSON.parse(
        sessionStorage.getItem("grantedPermissions")
      );
      this.ishide = grantedPermission.includes('Email Manager.Edit');
    }else{
      this.ishide= false;
    }    
    
  }

  onGetData() {
    
    this.userId = this.currentUser.id;
    this.mailCampaingId = this.selectedCampaign.map(a => a.id);
    this.types = this.selectedType.map(a => a.code);
    this.statusId = this.selectedStatus.map(a => a.code);
    
    
    let firstDate =  this.datePipe.transform(this.backdate, 'MM/dd/yyyy');
    let lastDate =   this.datePipe.transform(this.endDate, 'MM/dd/yyyy');
    this.emailService.searchEmails(firstDate, lastDate, this.mailCampaingId, this.types, this.statusId, this.userId).subscribe(res => {
      
      this.listingData = res.result;
      this.isNoRecorsFound = res.result.length === 0;
    });
  }

  onGetEmailText() {
    this.isSpinnerVisible = true;
    this.emailService.getMailCampaignText().subscribe(res => {
      let mailCampaigns : Array<MailCampaignsDto> =res.result.map((campaign)=>{
        return {id: campaign.id, name:campaign.name, description:campaign.description}

});
      
      mailCampaigns = this.getPermissionMailCampaigns(mailCampaigns);
      this.listing = mailCampaigns;
      this.listing.map((item) => this.selectedCampaign.push(item));
      this.mailCampaingId = this.selectedCampaign.map(a => a.id);
      if (res) {
        this.onGetData();
      }
      this.isSpinnerVisible = false;

    })
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

  onShowDialog(value?) {
    this.display = true;
  }

  onDialogClose(event) {
    if(!event) {
      this.onGetData();
    }
    this.display = event;
  }



  onCheckCampaign(event) {
    if (event.length == 0) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }

  onShowDetailsDialog(rowData) {
    this.displayDetails = true;
    this.rowData = rowData;

  }

  onShowDetailsDialogClose(event) {
    if(!event) {
      this.onGetData();
    }
    this.displayDetails = event;
  }

  onPageReload() {
    this.onGetData();
  }


  selectAllRow(checkValue) {
    if (checkValue) {
      this.selectedRows = this.listingData.filter(value => value.id);
       this.isChecked = true;
    } else {
      this.selectedRows = [];
      this.isChecked = false;

    }
  }

  //   refresh(): void {
  //     window.location.reload();
  // }
  sendMail() {
    this.message = this.selectedRows.map(a => a.id);
    this.emailService.sendMessages(this.message, this.userId).subscribe(res => {
      this.selectedRows = [];
      this.notify.success("Email sent successfully");
      this.onGetEmailText();
      this.isChecked = false;
    });
  }
}
