import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '../shared/core/common/app-constant';
import { ShareDataService } from '../shared/core/common/sharedDataService';
import { ManageSiteService } from './manage-site.service';

@Component({
  templateUrl: './manage-site.component.html',
  selector: 'manage-site',
})
export class ManageSiteComponent implements OnInit {
  @ViewChild('corporation', { static: false }) corporationtab: ElementRef;
  @ViewChild('user', { static: false }) userTab: ElementRef;
  @ViewChild('role', { static: false }) roleTab: ElementRef;
  @ViewChild('permission', { static: false }) permissionTab: ElementRef;
  @ViewChild('covid', { static: false }) covidTab: ElementRef;

  public isUser: boolean;
  public isRole: boolean;
  public isPermission: boolean;
  isCorporation: any;
  isCorporationPermission = true;
  isUserPermission = true;
  isRolePermission = true;
  isPermissionPermission = true;
  isCovidCard: any;
  isCovidPermission = true;



  constructor(private manageSiteService: ManageSiteService, private shareDataService: ShareDataService,
    private router: Router) { }
  ngOnInit() {
    //Need to refactor the code

    this.applyPermission();

  }



  corporationActive() {
    this.isUser = false;
    this.isRole = false;
    this.isPermission = false;
    this.isCorporation = true;
    this.isCovidCard = false;
    this.router.navigate(['/manage-site/manage-corporations']);
  }

  userActive() {
    this.isUser = true;
    this.isRole = false;
    this.isPermission = false;
    this.isCorporation = false;
    this.isCovidCard = false;
    this.router.navigate(['/manage-site/manage-users']);
  }
  roleActive() {
    this.isRole = true;
    this.isUser = false;
    this.isPermission = false;
    this.isCorporation = false;
    this.isCovidCard = false;
    this.router.navigate(['/manage-site/manage-roles']);

  }
  permissionActive() {
    this.isPermission = true;
    this.isRole = false;
    this.isUser = false;
    this.isCorporation = false;
    this.isCovidCard = false;
    this.router.navigate(['/manage-site/manage-permissions']);
  }

  covidCardActive() {
    this.isCovidCard = true;
    this.isPermission = false;
    this.isRole = false;
    this.isUser = false;
    this.isCorporation = false;
    this.router.navigate(['/manage-site/covid-card']);
  }

  private applyPermission() {
    this.isCorporationPermission = this.shareDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageCorporationsView);
    if (this.isCorporationPermission != true) {
      this.isCorporationPermission = this.shareDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageCorporationsEdit);
    }

    this.isUserPermission = this.shareDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageUsersView);
    if (this.isUserPermission != true) {
      this.isUserPermission = this.shareDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageUsersEdit);
    }

    this.isRolePermission = this.shareDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageRolesView);
    if (this.isRolePermission != true) {
      this.isRolePermission = this.shareDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageRolesEdit);
    }

    this.isPermissionPermission = this.shareDataService.isGrantedPermission(AppConsts.perMissionData.PageManagePermissionsView);
    if (this.isPermissionPermission != true) {
      this.isPermissionPermission = this.shareDataService.isGrantedPermission(AppConsts.perMissionData.PageManagePermissionsEdit);
    }
  
    this.isCovidPermission = this.shareDataService.isGrantedPermission(AppConsts.perMissionData.PageManageCovidCardsView);
    if (this.isCovidPermission != true) {
      this.isCovidPermission = this.shareDataService.isGrantedPermission(AppConsts.perMissionData.PageManageCovidCardsEdit);
    }
    
    //It has to be maintain this order otherwise it wont work properly
    if (this.isCorporationPermission) {

      this.corporationActive();
      setTimeout(() => {
        this.corporationtab.nativeElement.classList.add('active');
      }, 0);

    }
    else if (this.isUserPermission) {

      this.userActive();
      setTimeout(() => {
        this.userTab.nativeElement.classList.add('active');
      }, 0);
    }
    else if (this.isRolePermission) {

      this.roleActive();
      setTimeout(() => {
        this.roleTab.nativeElement.classList.add('active');
      }, 0);
    }
    else if (this.isPermissionPermission) {

      this.permissionActive();
      setTimeout(() => {
        this.permissionTab.nativeElement.classList.add('active');
      }, 0);
    }
    else if (this.isCovidPermission) {

      this.covidCardActive();
      setTimeout(() => {
        this.covidTab.nativeElement.classList.add('active');
      }, 0);
    }
  }



}
