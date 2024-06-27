
import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageSiteService } from '../manage-site.service';

import { Table } from 'primeng/table';


import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { MailCampaignManagementService } from './mail-campaign-management.service';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { ConfirmationService } from 'primeng/api';
import { MailCampaginDto } from './mail-campaign';

@Component({
  templateUrl: './mail-campaign-management.component.html',
  selector: 'mail-campaign-management',
  //   styleUrls: ['./mail-campaign-management.component.css']
})
export class MailCampaginManagementComponent implements OnInit {
  @ViewChild('dt2') table: Table;
  public display: boolean = false;
  public listingData;
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
  rowData: any;
  currentUser: any;
  isSpinnerVisible: boolean;
  public mailCampaginDetail: MailCampaginDto;

  constructor(private sharedDataService: ShareDataService, private confirmationService: ConfirmationService,
    private commonService: CommonService, private notify: NotifyService,
    private mailCampaignManagementService: MailCampaignManagementService) {

  }

  ngOnInit() {
    this.isEditPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageUsersEdit);
    this.reuestTypes = "Mail Campaign";
    this.mailCampaginDetail = new MailCampaginDto();

    this.getMailCampaign();

  }

  onExport() {
    // this.sorting = this.table.sortField;
    // if(this.table.sortOrder = 1){
    //   this.sortingType === "Asc";
    // }else{
    //   this.sortingType === "Dsc";
    // }
    // this.commonService.downloadExcel(this.facilityId,this.sorting,this.sortingType,this.reuestTypes).subscribe(res =>{
    //   saveAs(res, this.reuestTypes + ".xlsx");
    // });
  }

  onDialogClose(event: any) {
    if (event) {
      this.getMailCampaign();
    }
    this.display = false;
  }

  onShowDialog(rowData: any) {
    this.display = true;
    this.rowData = rowData;
    this.listingData = this.listingData;

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

  getMailCampaign() {
    this.isSpinnerVisible = true;
    this.mailCampaignManagementService.getMailCampaign().subscribe(

      res => {
      this.listingData = res.result;
      this.isNoRecorsFound = res.result.length === 0;
      this.isSpinnerVisible = false;

    });

  }

  onDeleteCampaign(rowData: any) {
    this.currentUser = this.sharedDataService.getUserValue();

    this.confirmationService.confirm({
      message: AppConsts.message.mailCampaginDeleteMessage,
      header: AppConsts.message.mailDeleteHeader,
      icon: '',
      accept: () => {
        this.mailCampaignManagementService.DeleteCampaign(rowData.id, this.currentUser.id).subscribe(
          response => {
            if (response.statusCode == 200) {
              this.getMailCampaign();
              this.notify.success(AppConsts.message.deletedMessage);
            }
            else {
              this.notify.error(AppConsts.message.CampaginAssignedMessage);
            }

          });

      },
      reject: (type) => {

      }
    });
  }

}
