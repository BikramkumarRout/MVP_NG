import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageSiteService } from '../manage-site.service';
import { CorporationDto } from './corporation';
import { Table } from 'primeng/table';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { ConfirmationService } from 'primeng/api';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { saveAs } from 'file-saver';

@Component({
  templateUrl: './corporations.component.html',
  selector: 'app-corporations',
})

export class CorporationsComponent implements OnInit {
  @ViewChild('dt2') table: Table;
  public display: boolean = false;
  public corporationDetail: CorporationDto;
  public listing: CorporationDto[] = [];
  public falcilityLists: any[] = [];
  public searchGlobalText;
  public isNoRecorsFound: boolean = false;
  isEditPermission: boolean;
  nameFilter: any;
  emailFilter: any;
  PhoneFilter: any;
  addressFilter: any;
  reuestTypes: string;
  facilityId: number;
  sorting: string;
  sortingType: string;
  currentUser: any;
  pages;
  constructor(private manageSiteService: ManageSiteService,
    private sharedDataService: ShareDataService, private commonService: CommonService, private confirmationService: ConfirmationService, private notify: NotifyService) { 
    }

  ngOnInit() {
    this.currentUser = this.sharedDataService.getUserValue();
    this.pages=this.currentUser.pages;
    this.isEditPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageUsersEdit);
    this.getCorporations();
    this.corporationDetail = new CorporationDto();
    this.reuestTypes = "Manage Corporations";

  }

  onExport() {
    this.sorting = this.table.sortField;
    if (this.table.sortOrder = 1) {
      this.sortingType === "Asc";
    } else {
      this.sortingType === "Dsc";
    }
    this.commonService.downloadExcel(this.facilityId, this.sorting, this.sortingType, this.reuestTypes).subscribe(res => {
      saveAs(res, this.reuestTypes + ".xlsx");
    });
  }

  getCorporations() {
    this.manageSiteService.getCorporations().
    subscribe(
      response => {
        this.listing = response.result.corporations;
        this.falcilityLists = response.result.faclities;
        this.isNoRecorsFound = response.result.corporations.length === 0;
      });
  }

  onDialogClose(event: any) {
    this.display = false;
    if (event) {
      this.getCorporations();
    }
    this.corporationDetail = new CorporationDto();
  }

  showDialog(corporationDetails: any) {
    this.corporationDetail = corporationDetails;
    this.display = true;
  }

  clear(table: Table) {
    table.clear();
    this.searchGlobalText = "";
  }

  public onFilter(event): void {
    this.nameFilter = event.filters.name[0].value;
    this.emailFilter = event.filters.email[0].value;
    this.PhoneFilter = event.filters.phone[0].value;
    this.addressFilter = event.filters.address[0].value;
  }


  onDeleteCorporation(rowData: any) {
    this.currentUser = this.sharedDataService.getUserValue();

    this.confirmationService.confirm({
      message: AppConsts.message.corporationDeleteMessage,
      header: AppConsts.message.mailDeleteHeader,
      icon: '',
      accept: () => {
        this.manageSiteService.DeleteCorporation(rowData.id, this.currentUser.id).subscribe(
          response => {            
            if (response.statusCode == 200) {
              this.getCorporations();
               this.notify.success(AppConsts.message.deletedMessage);
            }
            else {
              this.notify.error(AppConsts.message.CorporationAssignedMessage);
            }
            
          });

      },
      reject: (type) => {

      }
    });
     
  }


}
