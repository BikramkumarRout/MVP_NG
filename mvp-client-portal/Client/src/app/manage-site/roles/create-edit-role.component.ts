import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { NotificationService } from 'src/app/shared/core/common/notification';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { ManageSiteService } from '../manage-site.service';
import { RoleDto } from '../roles/role';
import { RoleService } from '../roles/role.service';
import * as _ from 'lodash';
import { PermissionService } from '../manage-permission/manage-permission.service';

@Component({
  templateUrl: './create-edit-role.component.html',
  selector: 'manage-role',
  styleUrls: ['./create-edit-role.component.css']

})

export class CreateEDitRoleComponent implements OnInit {
  @ViewChild("corporateForm", { static: true }) corporateForm: NgForm;
  public searchGlobalText;
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();
  @Input() roleDetail: RoleDto;
  roles: any;
  permissions: any;
  selectedPermission: any[] = [];
  isSaved: any;
  public submittedError: boolean;
  isRoleAssigned: false;
  currentUser: any;
  header: any;
  isEditPermission: any;
  listingData: any;
  isChecked: boolean;
  permissionId: any;
  selections: any[] = [];
  grantedPermission: any[] = [];
  permissionsDropdiwn: any;
  treeDenormalized: any[] = [];


  constructor(private notificationService: NotificationService, private manageSiteService: ManageSiteService, private roleService: RoleService, private sharedDataService: ShareDataService,
    private permissionService: PermissionService) { }

  ngOnInit() {
    this.isEditPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageRolesEdit);
    this.onGetPermission();
    let result = this.roleDetail;
    this.currentUser = this.sharedDataService.getUserValue();
    if (this.roleDetail.id === 0) {
      this.header = 'Create Role';
    } else {
      this.header = 'Edit Role'
    }

    this.permissionsDropdiwn = [
      { label: 'No Access', value: 1 },
      { label: 'View', value: 2 },
      {label: 'Edit', value: 3},



  ]

  }

  onGetPermission() {
    this.roleService.getPermissions(this.roleDetail.id).subscribe(
      response => {
        this.listingData = this.createTree(response.result.allPermission, 'parentId', 'id', null, 'children');
        this.grantedPermission = response.result.grantedPermission;

      });
  }




  onSaveRole() {
    let permission = this.createTreeDenormalized(this.listingData);
    //return true;
    if (!this.corporateForm.valid) {
      this.submittedError = true;
      return;
    }
    this.submittedError = false;
    this.roleDetail.permission = this.selections;
    this.roleDetail.permissionDetail = permission;

    this.roleDetail.userId = this.currentUser.id;
    this.roleService.saveRole(this.roleDetail).subscribe(
      response => {
        this.roles = response.result;
        this.isSaved = true;
        this.onClose();
      });
  }

  onClose() {
    if (this.corporateForm.dirty && !this.isSaved) {
      this.notificationService.activate(AppConsts.message.notification_Default_ValidationText, AppConsts.message.notification_Default_Message, AppConsts.message.notification_Default_OkButton).then(responseOK => {
        if (responseOK) {
          this.displayChange.emit(false);
        }
      });
    }
    else if (!this.corporateForm.dirty) {
      this.displayChange.emit(false);
    } else {
      this.displayChange.emit(true);
    }

  }



  checked(rowNode, event,rowData) {
    if (event.checked) {
      this.selections.push(rowNode.node.data.name);
      this.selections = [...this.selections];
    }
    else {
      let isDeletedPermission = this.grantedPermission.find(x => x.name == rowNode.node.data.name)
      if (isDeletedPermission) {
        if (!this.roleDetail.deletePermission) { this.roleDetail.deletePermission = [] };
        let isExist = this.roleDetail.deletePermission.find(x => x == rowNode.node.data.name)
        if (!isExist) {
          this.roleDetail.deletePermission.push(rowNode.node.data.name);
        }
      }
      this.selections.splice(this.selections.findIndex(item => item === rowNode.node.data.name),1);
    }
  }

  private createTreeDenormalized(array: any[]): any {

    let tree = [];

    let nodes = _.filter(array);
    _.forEach(nodes, node => {
      this.treeDenormalized.push(node.data);


       this.createTreeDenormalized(
        node.children

      );


    });

    return this.treeDenormalized;
  }


  private createTree(array: any[], parentIdProperty, idProperty, parentIdValue, childrenProperty: string): any {

    let tree = [];

    let nodes = _.filter(array, [parentIdProperty, parentIdValue]);

    _.forEach(nodes, node => {
      let newNode = {
        data: node,

      };

      newNode[childrenProperty] = this.createTree(
        array,
        parentIdProperty,
        idProperty,
        node[idProperty],
        childrenProperty,

      );

      tree.push(newNode);
    });

    return tree;
  }

}


