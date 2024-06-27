import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ManageSiteComponent } from './manage-site.component';

import { ManageUserDetailComponent } from './manage-user/manage-user-detail.component';
import { CommonModule } from '@angular/common';
import { ManageSiteRoutingModule } from './manage-site.routing.module';
import { ManageSiteService } from './manage-site.service';


import { FormsModule } from '@angular/forms';
//import { CreateUserComponent } from './manage-user/create-edit-user.component';
import { RolesComponent } from './roles/roles.component';
import { RoleService } from './roles/role.service';

import { CreateEDitRoleComponent } from './roles/create-edit-role.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { CreateEditPermissionComponent } from './manage-permission/create-edit-permission.component';
import { PermissionComponent } from './manage-permission/manage-permission.component';
import { PermissionService } from './manage-permission/manage-permission.service';

import { ManageUserModule } from './manage-user/manage-user.module';
import { RoleModule } from './roles/role.module';
import { ManagePermissionModule } from './manage-permission/manage-permission.module';


@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    ManageSiteRoutingModule,
    
    ManageUserModule,
    RoleModule,
    ManagePermissionModule,
   
  ],
  declarations: [
    ManageSiteComponent
  ],
  exports: [
  ],
  providers: [ManageSiteService, RoleService, PermissionService],
})
export class ManageSiteModule { }
