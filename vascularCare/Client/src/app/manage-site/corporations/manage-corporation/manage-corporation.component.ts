import { Component, EventEmitter, Input, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { CorporationDto } from '../corporation';
import { ManageSiteService } from '../../manage-site.service';
import { NgForm } from '@angular/forms';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from '../../../shared/core/common/app-constant';
import { NotifyService } from 'src/app/shared/core/common/toast/toast.service';
import { NotificationService } from 'src/app/shared/core/common/notification';
import { PhoneFormatPipe } from 'src/app/shared/pipe/phoneNoPipe';
@Component({
  templateUrl: './manage-corporation.component.html',
  selector: 'manage-corporation',
  styleUrls: ['./manage-corporation.component.css']
})

export class ManageCorporationComponent implements OnInit {
  @Input() display: boolean;
  @Input() listing;
  @Input() corporationDetail: CorporationDto;
  @Input() falcilityData;
  @Output() displayChange = new EventEmitter();
  @Output() patientProfileCloseEvent = new EventEmitter<boolean>();
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('corporateForm') public corporateForm: NgForm;
  public header: string;
  public emailList: any;
  public emailExists: any;
  public userId: any;
  public submittedError;
  public selectedFacilities: any[] = [];
  public facilityList: any[];
  public isEditPermission: boolean = false;

  private isSaved = false;
  private currentUser: any;



  constructor(private manageSiteService: ManageSiteService,private notificationService: NotificationService,
     private notify: NotifyService, private sharedDataService: ShareDataService, private phoneFormat: PhoneFormatPipe) {
  }

  ngOnInit() {
    
    this.isEditPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageCorporationsEdit);
    this.facilityList = this.falcilityData;
    this.currentUser = this.sharedDataService.getUserValue(); 
    
    this.emails();
    if (+this.corporationDetail.id > 0) {
      this.header = 'Edit Corporation';
      if (this.corporationDetail.facilityids) {
        let facilities = JSON.parse("[" + this.corporationDetail.facilityids + "]");
        const facilityFiltered = this.facilityList.filter(el => {
          return facilities.some(f => {
            return f === el.id;
          });
        });
        this.selectedFacilities = facilityFiltered;
      }
      this.corporationDetail.phone = this.phoneFormat.transform(this.corporationDetail.phone);
    }
    else {
      this.header = 'Create Corporation';
    }
  }

  onChange(data, remove = false, id?) {
    if (remove) {
      for (let i = 0; i < this.selectedFacilities.length; i++) {
        if (this.selectedFacilities[i] === id) {
          this.selectedFacilities.splice(i, 1);
        }
      }
    }
  }

  save() {
    this.submittedError = false;
    if (!this.corporateForm ||!this.corporateForm.valid || this.emailExists) {
      this.submittedError = true;
      return;
    }
    if (this.selectedFacilities && this.selectedFacilities.length > 0) {
      let result = this.selectedFacilities.map(a => a.id);
      this.corporationDetail.facilityids = result.join(',') + ',';
    }
    // let model = new CorporationDto();
    // model.id = this.corporationDetail.id;
    // model.name = this.corporationDetail.name;
    // model.address = this.corporationDetail.address;
    // model.email = this.corporationDetail.email;
    // model.phone = this.corporationDetail.phone.toString();;
    // model.userId = this.corporationDetail.userId;
    // model.facilityids = this.corporationDetail.facilityids;
    // this.corporationDetail.phone=this.corporateForm.form.value.phone ;
      if (+this.corporationDetail.id === 0) {
        this.manageSiteService.saveCorporations(this.corporationDetail).subscribe(
          result => {
            this.isSaved = true;
            this.onClose();
          });
    }
    else {
      this.corporationDetail.userId = this.currentUser.id;
      this.manageSiteService.updateCorporations(this.corporationDetail).subscribe(
        result => {
          this.isSaved = true;
          this.onClose();
        });
    }
  }

  emails() {
    this.emailList = this.listing.reduce((a, o) => (o.email && a.push(o.email), a), []);
  }

  emailMatch() {
    const emailId = this.emailList.includes(this.corporationDetail.email);
    this.emailExists = emailId;

  }

  onPatientProfileClose() {
    this.patientProfileCloseEvent.emit(true);
  }

  onClose() {
    if (this.corporateForm.dirty && !this.isSaved) {
      this.notificationService.activate(AppConsts.message.notification_Default_ValidationText, AppConsts.message.notification_Default_Message, AppConsts.message.notification_Default_OkButton).then(responseOK => {
        if (responseOK) {
          this.displayChange.emit(false);
        }
      });
    }
    else if(!this.corporateForm.dirty) {
      this.displayChange.emit(false);
    }else{
      this.displayChange.emit(true);
    }

  }

}
