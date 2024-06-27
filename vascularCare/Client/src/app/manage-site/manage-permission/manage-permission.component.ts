
import { Component, OnInit } from '@angular/core';
import { ManageSiteService } from '../manage-site.service';
import * as _ from 'lodash';
import { Table } from 'primeng/table';
import { PermissionDto } from './manage-permission';
import { PermissionService } from './manage-permission.service';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { NotificationService } from 'src/app/shared/core/common/notification';
import { ConfirmationService } from 'primeng/api';
import { NotifyService } from 'src/app/shared/core/common/toast';


@Component({
  templateUrl: './manage-permission.component.html',
  selector: 'app-permissions',
  styleUrls: ['./manage-permission.component.css']
})
export class PermissionComponent implements OnInit {
  public display: boolean = false;
  public listingData: PermissionDto[] = [];
  public permissionDetail: PermissionDto;
  public searchGlobalText;
  isNoRecorsFound: boolean = false;
  currentUser: any;

  parentList: any;
  isEditPermission: any;
  constructor(private permissionService: PermissionService,private notify: NotifyService, private sharedDataService: ShareDataService, private notificationService: NotificationService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.isEditPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageUsersEdit);
    this.onGetPermissions();
    this.permissionDetail = new PermissionDto();
    this.currentUser = this.sharedDataService.getUserValue();
  }

  onDialogClose(event: any) {
    this.display = false;
    if (event) {
      this.onGetPermissions();
    }
    this.permissionDetail = new PermissionDto();
  }

  onShowDialog(permissionDetails: any) {
    this.permissionDetail = permissionDetails;
    this.display = true;
  }

  onDeletePermission(permissionDetails: any) {
    this.confirmationService.confirm({
      message: AppConsts.message.permissionDeleteHeader,
      header: AppConsts.message.mailDeleteHeader,
      icon: '',
      accept: () => {
               this.permissionService.deletePermisionLookUp(permissionDetails.id, this.currentUser.id).subscribe(
          response => {
            this.onGetPermissions();
            this.notify.success(AppConsts.message.deletedMessage);
          });

      },
      reject: (type) => {

      }
    // this.notificationService.activate(AppConsts.message.notification_Delete_Cinfirmation, AppConsts.message.deleteConformMessage, AppConsts.message.notification_Default_OkButton).then(responseOK => {
    //   if (responseOK) {
    //     this.permissionService.deletePermisionLookUp(permissionDetails.id, this.currentUser.id).subscribe(
    //       response => {
    //         this.onGetPermissions();
    //       });

    //   }
    });
  }

  

  onGetPermissions() {
    this.permissionService.getPermissions().subscribe(
      response => {
        this.listingData = this.createTree(response.result.data, 'parentId', 'id', null, 'children');
        this.isNoRecorsFound = this.listingData.length === 0;
        this.parentList = response.result.data;        
      });
  }

  createTree(array: any[], parentIdProperty, idProperty, parentIdValue, childrenProperty: string): any {
    let tree = [];
    let nodes = _.filter(array, [parentIdProperty, parentIdValue]);
    _.forEach(nodes, node => {
      let newNode = {
        data: node
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

  clear(value?) {
    this.searchGlobalText = "";
  }

}
