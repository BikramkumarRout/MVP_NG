
import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageSiteService } from '../manage-site.service';

import { Table } from 'primeng/table';

import { RoleService } from './role.service';
import { RoleDto } from './role';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { CommonService } from 'src/app/shared/core/common/commonService';
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
  constructor(private roleService: RoleService,private sharedDataService: ShareDataService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.isEditPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageUsersEdit);
    this.onGetRole();
    this.roleDetail = new RoleDto();
    this.reuestTypes = "manage Roles";

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

  onDialogClose(event: any) {
    this.display = false;
    if (event) {
      this.onGetRole();
    }
    this.roleDetail = new RoleDto();
  }

  onShowDialog(roleDetails:any) {
    this.roleDetail = roleDetails;
    this.display = true;
  }

  onGetRole() {
    this.roleService.getRoles().subscribe(
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

}
