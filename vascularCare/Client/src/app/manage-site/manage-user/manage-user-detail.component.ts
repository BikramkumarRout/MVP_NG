import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ManageSiteService } from "../manage-site.service";

import { NgForm } from "@angular/forms";
import { ShareDataService } from "src/app/shared/core/common/sharedDataService";
import { NotifyService } from "src/app/shared/core/common/toast";
import { AppConsts } from "src/app/shared/core/common/app-constant";
import { MessageService } from "src/app/messages/message.service";
import { NotificationService } from "src/app/shared/core/common/notification";
import { PhoneFormatPipe } from "src/app/shared/pipe/phoneNoPipe";
import { UserDto } from "./manage-user";
import { UsstatesService } from "src/app/shared/core/common/usstates.service";
import * as CryptoJS from "crypto-js";

@Component({
  templateUrl: "./manage-user-detail.component.html",
  selector: "manage-user-detail",
  styleUrls: ["./manage-user-detail.component.css"],
})
export class ManageUserDetailComponent implements OnInit, AfterViewInit {
  @ViewChild("userForm") public userForm: NgForm;
  @Input() listingData;
  @Input() roleTypeId;
  @Input() userDetail: UserDto;
  @Input() display: boolean;
  @Input() roles;
  @Output() displayChange = new EventEmitter();
  public header: string;
  public active = true;
  public confirmPassword: string = "";
  public corporation: any;
  public userRole;
  public role: any;
  public emailList: any;
  public emailExists: any;
  public emailCall: boolean = false;
  public submittedError;
  public facilityList: any[];
  public corporateList: any[];
  public selectedCorporateFacilities: any[] = [];
  public selectedFacilities: any[] = [];
  public selectedCorporate: any[] = [];
  private currentUser: any;
  private isSaved = false;
  private facilityUserLists: any[];
  private facilityCorporateLists: any[];
  selectedRoles: any[] = [];
  isUserDetails: any;
  isUserRoles: any;
  isEditPermission: any;
  superUserRole: any;
  isMVPUser = false;
  submittedError1: boolean;
  submittedError2: boolean;
  stateList: any;
  userState: any;
  isDisable: boolean;
  isInternal: boolean;
  aaa: any;
  internalRoles: any;
  externalRoles: any;
  constructor(
    private manageSiteService: ManageSiteService,
    private sharedDataService: ShareDataService,
    private notify: NotifyService,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private phoneFormat: PhoneFormatPipe,
    private staeService: UsstatesService
  ) { }

  ngOnInit() {   
    this.currentUser = this.sharedDataService.getUserValue(); 
    let internalWithSuperUser = this.roles.filter(e => e.roleType==1);
    if(this.currentUser.mvpRoleType !== "SuperUser")
    {
      internalWithSuperUser = this.roles.filter(e => e.roleType ===1 && e.name !== "SuperUser");

    }
    this.internalRoles = internalWithSuperUser;
    this.externalRoles = this.roles.filter(e => e.roleType==2);
    this.isEditPermission = this.sharedDataService.isGrantedPermission(
      AppConsts.perMissionData.PagesManageUsersEdit
    );
    this.onUserDetails();
    this.currentUser = this.sharedDataService.getUserValue();
    
    this.role = this.currentUser.mvpRoleType;

    this.getStateList();
    this.isUserDetails = true;
    this.onGetUserCorporations();
    this.getUserDetails();
    this.userDetail.userId = this.currentUser.id;
    let arrySelectedRoleIds: number[];
    if (this.userDetail.selectedRoleId) {
      arrySelectedRoleIds = this.userDetail.selectedRoleId
        .split(",")
        .map((x) => {
          return parseInt(x);
        });
      let res = this.roles.filter((el) => {
        return arrySelectedRoleIds.find((element) => {
          return element === el.id;
        });
      });
      this.selectedRoles = res;
    }
    this.onFetchEmails();
    if (+this.userDetail.id > 0) {
      if (this.userDetail.status === 1) {
        this.active = true;
      } else {
        this.active = false;
      }
      // this.userDetail.password = 
      if (this.userDetail.password) {
        this.getDecrypted();
      }
      // this.userDetail.password = this.sharedDataService.decrypt(AppConsts.encryptionDecryption.key, this.userDetail.password);
      this.confirmPassword = this.userDetail.password;
      this.role = this.userDetail.userRolename;
      this.header = "Edit User";

      this.userState = this.stateList.find(x => x.name == this.userDetail.state);
      this.userDetail.phoneNumber = this.phoneFormat.transform(
        this.userDetail.phoneNumber
      );
      if (
        this.userDetail.userRolename === "MVPAdministrative" &&
        this.superUserRole.role !== "SuperUser"
      ) {
        this.isMVPUser = true;
      }
    } else {
      this.header = "Create User";
      this.facilityList = this.facilityUserLists;

      if (this.selectedFacilities[0] == undefined) {
        this.selectedFacilities = [];
      }
      this.userDetail.userRolename = "Facility";
      this.role = "Facility";
    }
    if (this.roleTypeId == 1) {
      this.isInternal = true;
    }
  }
  getUserDetails() {
    this.superUserRole = this.sharedDataService.getUser();
  }

  onUserDetails() {
    this.isUserDetails = true;
    this.isUserRoles = false;
  }

  // get list of states

  getStateList() {
    this.stateList = this.staeService.getStates()
  }
  onUserRoles() {
    this.isUserDetails = false;
    this.isUserRoles = true;
  }

  ngAfterViewInit(): void { }

  onChange(data, remove = false, id?) {
    if (remove) {
      for (var i = 0; i < this.selectedFacilities.length; i++) {
        if (this.selectedFacilities[i] === id) {
          this.selectedFacilities.splice(i, 1);
        }
      }
    }
  }

  onFetchEmails() {
    this.emailList = this.listingData.reduce(
      (a, o) => (o.email && a.push(o.email), a),
      []
    );
  }

  onEmailMatch() {
    this.emailExists = this.emailList.includes(this.userDetail.email);
  }

  onSelectedRole(value) {
    this.role = value;
    if (this.role === "Facility") {
      this.facilityList = this.facilityUserLists;
      this.selectedFacilities = [];
    } else if (this.role === "Corporate") {
      this.facilityList = this.facilityCorporateLists;
      if (this.userDetail.facilityids) {
        let facilities = JSON.parse("[" + this.userDetail.facilityids + "]");
        const facilityFiltered = this.facilityList.filter((el) => {
          return facilities.some((f) => {
            return f === el.id;
          });
        });
        this.selectedFacilities = facilityFiltered;
      } else {
        this.selectedFacilities = this.facilityList;
      }
    }
  }

  onClose() {
    if (this.userForm.dirty && !this.isSaved) {
      this.notificationService
        .activate(
          AppConsts.message.notification_Default_ValidationText,
          AppConsts.message.notification_Default_Message,
          AppConsts.message.notification_Default_OkButton
        )
        .then((responseOK) => {
          if (responseOK) {
            this.displayChange.emit(false);
          }
        });
    } else if (!this.userForm.dirty) {
      this.displayChange.emit(false);
    } else {
      this.displayChange.emit(true);
    }
  }
  getDecrypted() {
    this.manageSiteService.getDecrypted(this.userDetail.password).subscribe((response) => {
      this.userDetail.password = response.result;
      this.confirmPassword = response.result;

    });
  }

  onGetUserCorporations() {
    this.manageSiteService.getUserCorporations().subscribe((response) => {
      this.corporateList = response.result.item1;
      this.facilityUserLists = response.result.item2;
      if (
        this.userDetail.corporationId &&
        this.userDetail.userRolename == "Corporate"
      ) {
        this.corporation = this.corporateList.find(
          (x) => x.id == this.userDetail.corporationId
        );
        this.onCorporateChange();
      }
      if (this.userDetail.userRolename == "Facility") {
        this.facilityList = response.result.item2;
        this.selectedFacilities.push(
          this.facilityList.find((x) => x.id == this.userDetail.facilityids)
        );
        if (this.userDetail.firstName === "") {
          this.selectedFacilities = [];
        }
      }
    });
  }

  changeValue(value) {
    if (this.selectedRoles.length >= 0) {
      this.selectedRoles = value;
    }
  }

  onCorporateChange() {
    let corporationId = this.corporation.id;
    this.manageSiteService
      .getUserCorporateFacility(corporationId)
      .subscribe((data) => {
        this.facilityList = data.result;
        this.facilityCorporateLists = data.result;
        if (this.userDetail.facilityids) {
          let facilities = JSON.parse("[" + this.userDetail.facilityids + "]");
          const facilityFiltered = this.facilityList.filter((el) => {
            return facilities.some((f) => {
              return f === el.id;
            });
          });
          this.selectedFacilities = facilityFiltered;
        } else {
          this.selectedFacilities = data.result;
        }
      });
  }

  onSave() {
    if (this.roleTypeId !== 1) {
      if (!this.userForm || !this.userForm.valid || this.emailExists) {
        this.submittedError = true;
        return;
      }
      if (
        this.userDetail.userRolename === "Facility" ||
        this.userDetail.userRolename === "Corporate"
      ) {
        if (this.selectedFacilities.length === 0) {
          this.submittedError1 = true;
          this.notify.error("Please select atleast one facility");
          return;
        }
      }
    }



    this.submittedError = false;
    if (this.active) {
      this.userDetail.status = 1;
    } else {
      this.userDetail.status = 2;
    }

    if (this.userDetail.userRolename === "Facility") {
      this.userDetail.corporationId = this.selectedFacilities[0].id;
      this.userDetail.facilityids = null;
    } else if (
      this.userDetail.userRolename === "Corporate" &&
      this.selectedFacilities &&
      this.selectedFacilities.length > 0 &&
      this.corporation
    ) {
      this.userDetail.corporationId = this.corporation.id;
      let result = this.selectedFacilities.map((a) => a.id);
      this.userDetail.facilityids = result.join(",");
    }

    let model = new UserDto();
    model.id = this.userDetail.id;
    model.address = this.userDetail.address;
    model.city = this.userDetail.city;
    model.email = this.userDetail.email;
    model.firstName = this.userDetail.firstName;
    model.lastName = this.userDetail.lastName;
    model.name = this.userDetail.name;
    model.designation = this.userDetail.designation;
    if (this.roleTypeId === 1) {
      model.password = null;
    } else {
      model.password = this.sharedDataService.encryptData(
        this.userDetail.password
      );
    }
    model.userId = this.userDetail.userId;

    model.userRolename = this.userDetail.userRolename;
    model.zipCode = this.userDetail.zipCode.toString();
    model.corporationId = this.userDetail.corporationId
      ? this.userDetail.corporationId
      : null;
    model.facilityids = null;
    if (this.userDetail.userRolename != "MVPAdministrative") {
      model.facilityids = this.userDetail.facilityids
        ? this.userDetail.facilityids
        : null;
    }

    model.status = this.userDetail.status;
    if (this.userState && this.userState.name) {

      model.state = this.userState.name;
    } else {
      model.state = "";
    }
    // return;
    model.userType = this.roleTypeId;
    model.phoneNumber = this.userDetail.phoneNumber.toString();
    if (this.selectedRoles && this.selectedRoles.length > 0) {
      let result = this.selectedRoles.map((a) => a.id);
      model.selectedRoleId = result.join(",");

    } else {
      model.selectedRoleId = null;
    }

    if (+this.userDetail.id === 0) {
      this.manageSiteService.saveUser(model).subscribe((result) => {
        this.isSaved = true;
        this.onClose();
      });
    } else {
      this.emailCall = false;
      this.manageSiteService.updateUser(model).subscribe((result) => {
        this.isSaved = true;
        this.onClose();
      });
    }
  }
}
