import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts, ROUTE_BY_PERMISSION } from '../shared/core/common/app-constant';
import { ShareDataService } from '../shared/core/common/sharedDataService';
import { ManageSiteService } from './manage-site.service';

@Component({
  templateUrl: './manage-site.component.html',
  selector: 'manage-site',
  styleUrls: ['./manage-site.component.css']
})
export class ManageSiteComponent implements OnInit {
  isCorporationPermission = true;
  isUserPermission = true;
  isRolePermission = true;
  isPermissionPermission = true;
  isCovidPermission = true;
  ismailCampaignPermission = true;
  isAppSettingPermission = true;
  public portalFooter: boolean = true;
  isEmailManagerPermission: boolean = true;
  isEmailPermission: boolean = true;
  isFacilityPermission: boolean = true;
  isVccPermission: boolean = true;
  isHrPermission: boolean = true;
  isBioPermission: boolean = true;
  isHideEmailDropdown: any;
  constructor(private manageSiteService: ManageSiteService, private sharedDataService: ShareDataService,
    private router: Router) { }

  ngOnInit() {
    let user = this.sharedDataService.getUserPermissions();
    

    //Need to refactor the code
    this.applyPermission();
    if(this.isEmailManagerPermission && this.ismailCampaignPermission){
      this.isHideEmailDropdown =true;
    }
  }

  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
  }

  private applyPermission() {
    this.isCorporationPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageCorporationsView);
    if (this.isCorporationPermission != true) {
      this.isCorporationPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageCorporationsEdit);
    }

    this.isUserPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageUsersView);
    if (this.isUserPermission != true) {
      this.isUserPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageUsersEdit);
    }

    this.isRolePermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageRolesView);
    if (this.isRolePermission != true) {
      this.isRolePermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageRolesEdit);
    }

    this.isPermissionPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PageManagePermissionsView);
    if (this.isPermissionPermission != true) {
      this.isPermissionPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PageManagePermissionsEdit);
    }

    this.isCovidPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PageManageCovidCardsView);
    if (this.isCovidPermission != true) {
      this.isCovidPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PageManageCovidCardsEdit);
    }
    this.ismailCampaignPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesEmailCampaignManagerView);
    if (this.ismailCampaignPermission != true) {
      this.ismailCampaignPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesEmailCampaignManagerEdit);
    }
    this.isEmailManagerPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesEmailManagerView);
    if (this.isEmailManagerPermission != true) {
      this.isEmailManagerPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesEmailManagerEdit);
    }
    this.isHrPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesHrView);
    if (this.isHrPermission != true) {
      this.isHrPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesHrEdit);
    }
    this.isFacilityPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesFacilitiesView);
    if (this.isFacilityPermission != true) {
      this.isFacilityPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesFacilitiesEdit);
    }
    this.isVccPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesVccView);
    if (this.isVccPermission != true) {
      this.isVccPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesVccEdit);
    }
    this.isAppSettingPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesAppSettingView);
    if (this.isAppSettingPermission != true) {
      this.isAppSettingPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesAppSettingEdit);
    }
    this.isEmailPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesEmailManagerView);
    if (this.isEmailPermission != true) {
      this.isEmailPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesEmailManagerEdit);
    }
    this.isBioPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesBioUploadView);
    if (this.isBioPermission != true) {
      this.isBioPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesBioUploadEdit);
    }
    //It has to be maintain this order otherwise it wont work properly
  }



}




