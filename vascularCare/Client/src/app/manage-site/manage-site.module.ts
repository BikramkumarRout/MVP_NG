import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ManageSiteComponent } from './manage-site.component';
import { ManageCorporationComponent } from './corporations/manage-corporation/manage-corporation.component';
import { ManageUserDetailComponent } from './manage-user/manage-user-detail.component';
import { CommonModule } from '@angular/common';
import { ManageSiteRoutingModule } from './manage-site.routing.module';
import { ManageSiteService } from './manage-site.service';
import { CorporationsComponent } from './corporations/corporations.component';

import { FormsModule } from '@angular/forms';
//import { CreateUserComponent } from './manage-user/create-edit-user.component';
import { RolesComponent } from './roles/roles.component';
import { RoleService } from './roles/role.service';

import { CreateEDitRoleComponent } from './roles/create-edit-role.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { CreateEditPermissionComponent } from './manage-permission/create-edit-permission.component';
import { PermissionComponent } from './manage-permission/manage-permission.component';
import { PermissionService } from './manage-permission/manage-permission.service';
import { CorporationsModule } from './corporations/corporations.module';
import { ManageUserModule } from './manage-user/manage-user.module';
import { RoleModule } from './roles/role.module';
import { ManagePermissionModule } from './manage-permission/manage-permission.module';
import { CovidCardModule } from './covid-card/covid-card.module';
import { MailCampaignManagementModule } from './mail-campaign/mail-campaign-management.module';
import { ApplicationSettingModule } from './application-setting/application-setting.module';
import { EmailManagerModule } from './email-manager/email-manager.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { VccModule } from './manage-vcc/vcc-listing.module';
import { HRListingModule } from './hr/hr.module';
import { BioUploadModule } from './bio-upload/bio-upload.module';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    ManageSiteRoutingModule,
    CorporationsModule,
    ManageUserModule,
    RoleModule,
    ManagePermissionModule,
    CovidCardModule,
    MailCampaignManagementModule,
    ApplicationSettingModule,
    EmailManagerModule,
    FacilitiesModule,
    VccModule,
    HRListingModule,
    BioUploadModule
  ],
  declarations: [
    ManageSiteComponent
  ],
  exports: [
  ],
  providers: [ManageSiteService, RoleService, PermissionService],
})
export class ManageSiteModule { }
