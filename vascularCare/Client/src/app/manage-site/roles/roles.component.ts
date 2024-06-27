
import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageSiteService } from '../manage-site.service';

import { Table } from 'primeng/table';

import { RoleService } from './role.service';
import { RoleDto } from './role';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { ConfirmationService } from 'primeng/api';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { saveAs } from 'file-saver';

@Component({
  templateUrl: './roles.component.html',
  selector: 'app-roles',
})
export class RolesComponent implements OnInit {
  @ViewChild('dt2') table: Table;
  public display: boolean = false;
  public listingData: RoleDto[] = [];
  public roleDetail: RoleDto;
  public searchGlobalText;
  isNoRecorsFound: boolean = false;
  isEditPermission: boolean;
  nameFilter: any;
  emailFilter: any;
  roleFilter: any;
  displayNameFilter: any;
  reuestTypes: string;
  facilityId: number;
  sorting: string;
  sortingType: string;
  currentUser: any;
  selectedRoleType:any;
  roleTypes: any;
  roleTypeId: number = 2;
  constructor(private roleService: RoleService, private sharedDataService: ShareDataService,
    private commonService: CommonService, private confirmationService: ConfirmationService, private notify: NotifyService) { 
      this.roleTypes = [
        { name: 'External', id: 2 },
         { name: 'Internal', id: 1 }
      ]

    }

  ngOnInit() {
    this.isEditPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageUsersEdit);
    this.onGetRole();
    this.roleDetail = new RoleDto();
    this.reuestTypes = "Manage Roles";

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

  onDialogClose(event: any) {
    this.display = false;
    if (event) {
      this.roleTypeId = 2;
      this.roleTypes.id = 2;
      this.roleTypes.name = "External";
      this.onGetRole();
    }
    this.roleDetail = new RoleDto();
  }

  onShowDialog(roleDetails: any) {
    this.roleDetail = roleDetails;   
    this.roleTypeId = roleDetails.roleType;
    this.display = true;
  }

  onGetRole() {
    this.roleService.getRoles(this.roleTypeId).subscribe(
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
    this.displayNameFilter = event.filters.displayName[0].value;
    this.roleFilter = event.filters.roleDescription[0].value;
  }

  onDeleteRole(rowData: any) {
    this.currentUser = this.sharedDataService.getUserValue();

    this.confirmationService.confirm({
      message: AppConsts.message.ruleDeleteMessage,
      header: AppConsts.message.mailDeleteHeader,
      icon: '',
      accept: () => {
        this.roleService.DeleteRole(rowData.id, this.currentUser.id).subscribe(
          response => {
            this.onGetRole();
            if (response.statusCode == 200) {
              this.onGetRole();
               this.notify.success(AppConsts.message.deletedMessage);
            }
            else {
              this.notify.error(AppConsts.message.ruleAssignedMessage);
            }
           });

      },
      reject: (type) => {
        //this.notify.error(AppConsts.message.deletedMessage);
      }
    });
  }

  onSelectRole(event) {
    this.roleTypeId = event.value.id;
    this.onGetRole();
  }

}
