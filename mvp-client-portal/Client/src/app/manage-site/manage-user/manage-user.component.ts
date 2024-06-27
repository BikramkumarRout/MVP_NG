import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageSiteService } from '../manage-site.service';

import { Table } from 'primeng/table';
import { RoleService } from '../roles/role.service';
import { UserDto } from './manage-user';
import { RoleDto } from '../roles/role';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { NotificationService } from 'src/app/shared/core/common/notification';
import { ConfirmationService } from 'primeng/api';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { saveAs } from 'file-saver';

@Component({
  templateUrl: './manage-user.component.html',
  selector: 'app-users',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  @ViewChild('dt2') table: Table;
  public display: boolean = false;
  public listingData: UserDto[] = [];
  public userDetail: UserDto;
  public searchGlobalText;
  public isNoRecorsFound: boolean = false;
  roles: RoleDto[] = [];
  isUserDetails: any;
  isEditPermission: boolean;
  currentUser: any;
  nameFilter: any;
  emailFilter: any;
  PhoneFilter: any;
  reuestTypes: string;
  facilityId: number;
  sorting: string;
  sortingType: string;

  constructor(private manageSiteService: ManageSiteService,
    private sharedDataService: ShareDataService, private roleService: RoleService,private commonService: CommonService,
    private notificationService: NotificationService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.isEditPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageUsersEdit);
    this.onGetUser();
    this.onGetRole();
    this.userDetail = new UserDto();
    this.currentUser = this.sharedDataService.getUserValue();
    this.reuestTypes = "manage Users";
  }

  onExport() {
    this.sorting = this.table.sortField;
    if(this.table.sortOrder = 1){
      this.sortingType === "Asc";
    }else{
      this.sortingType === "Dsc";
    }
    this.commonService.downloadExcel(this.facilityId,this.sorting,this.sortingType,this.reuestTypes).subscribe(res =>{
      saveAs(res, this.reuestTypes + ".xlsx");

    });
  }
  onGetRole() {
    this.roleService.getRoles().subscribe(
      response => {
        this.roles = response.result;

      });
  }

  onDeleteUser(rowData: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Confirm Delete',
      icon: '',
      accept: () => {
             this.roleService.DeleteUser(rowData.id, this.currentUser.id).subscribe(
          response => {
            this.onGetUser();
          });

      },
      reject: (type) => {

      }
  });
    // this.notificationService.activate(AppConsts.message.notification_Delete_Cinfirmation, AppConsts.message.deleteConformMessage, AppConsts.message.notification_Default_OkButton).then(responseOK => {
    //   if (responseOK) {
    //     this.roleService.DeleteUser(rowData.id, this.currentUser.id).subscribe(
    //       response => {
    //         this.onGetUser();
    //       });

    //   }
    // });
  }

  onDialogClose(event: any) {
    this.display = false;
    if (event) {
      this.onGetUser();
    }
    this.userDetail = new UserDto();
  }

  onShowDialog(userDetails: any) {
    this.userDetail = userDetails;
    this.display = true;
  }

  onGetUser() {
    this.manageSiteService.getUsers().subscribe(
      response => {
        this.listingData = response.result;
        this.isNoRecorsFound = response.result.length === 0;
      });
  }

  clear(table: Table) {
    table.clear();
    this.searchGlobalText = "";
  }

  public onFilter(event): void {
    this.nameFilter = event.filters.name[0].value;
    this.emailFilter = event.filters.email[0].value;
    this.PhoneFilter = event.filters.phoneNumber[0].value;
  }

}
