import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { NotificationService } from 'src/app/shared/core/common/notification';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { ManageSiteService } from '../manage-site.service';

import { PermissionDto } from './manage-permission';
import { PermissionService } from './manage-permission.service';

@Component({
  templateUrl: './create-edit-permission.component.html',
  selector: 'create-edit-permission',
  styleUrls: ['./create-edit-permission.component.css']

})

export class CreateEditPermissionComponent implements OnInit {
  @ViewChild("permissionForm", { static: true }) permissionForm: NgForm;
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();
  @Input() parentList;
  @Input() permissionDetail: PermissionDto;
  public searchGlobalText;
  files1: TreeNode[];
  roles: any;
  permissions: any;
  selectedPermission: any[] = [];
  isSaved: any;
  public submittedError: boolean;
  currentUser: any;
  isDisabled = false;
  header: string;
  isEditPermission: any;
  files2: TreeNode<any>[];
  cols: { field: string; header: string; }[];
  public parentPermissions: any;
  submittedError1: any;
  constructor(private notificationService: NotificationService, private notify: NotifyService, private manageSiteService: ManageSiteService, private permissionService: PermissionService, private sharedDataService: ShareDataService) { }

  ngOnInit() {
    this.isEditPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PageManagePermissionsEdit);
    let result = this.permissionDetail;
    this.currentUser = this.sharedDataService.getUserValue();
    this.getPermissionEdit();
    if (this.permissionDetail.id === 0) {
      this.header = 'Create Permission';
    } else {
      this.header = 'Edit Permission'

    }
    this.getPermissionLookUp();
  }
  getPermissionLookUp() {
    this.permissionService.getPermissionLookUp(+this.permissionDetail.id).subscribe(
      response => {
        this.parentList = response.result;
        if (this.permissionDetail.parentId != null) {
          this.parentPermissions = this.parentList.find(x => x.id === this.permissionDetail.parentId);
        }

      });
  }
  getPermissionEdit() {
    this.permissionService.getIsPermissionEdit(this.permissionDetail.name).subscribe(
      response => {
        this.isDisabled = response.result;

      });
  }

  onSavePermission() {
    // if(this.permissionForm.form.controls.parentPermission.status === "INVALID"){
    //   this.submittedError1 = true;
    // }
    if (!this.permissionForm.valid) {
      this.submittedError = true;
      return;
    }
    this.submittedError = false;
    if(!this.parentPermissions) {
      this.permissionDetail.parentId = 0;

    }else{

      this.permissionDetail.parentId = this.parentPermissions.id;
    }
    this.permissionDetail.userId = this.currentUser.id;
    this.permissionService.savePermission(this.permissionDetail).subscribe(
      response => {
        if(response.result === false) {
          this.notify.warn(AppConsts.message.permissionExist);
        }else {
          this.roles = response.result;
          this.isSaved = true;
          this.onClose();
        }
        
      });
  }

  onClose() {
    if (this.permissionForm.dirty && !this.isSaved) {
      this.notificationService.activate(AppConsts.message.notification_Default_ValidationText, AppConsts.message.notification_Default_Message, AppConsts.message.notification_Default_OkButton).then(responseOK => {
        if (responseOK) {
          this.displayChange.emit(false);
        }
      });
    }
    else if (!this.permissionForm.dirty) {
      this.displayChange.emit(false);
    } else {
      this.displayChange.emit(true);
    }
  }


}
