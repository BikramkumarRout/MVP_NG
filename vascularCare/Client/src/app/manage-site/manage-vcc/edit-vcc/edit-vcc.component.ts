import { Component, EventEmitter, Input, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { ManageSiteService } from '../../manage-site.service';
import { NgForm } from '@angular/forms';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from '../../../shared/core/common/app-constant';
import { NotifyService } from 'src/app/shared/core/common/toast/toast.service';
import { NotificationService } from 'src/app/shared/core/common/notification';
import { PhoneFormatPipe } from 'src/app/shared/pipe/phoneNoPipe';
import { VccDto } from '../vcc-details';
import * as moment from 'moment';
import { VccService } from '../vcc-listing.service';

@Component({
  templateUrl: './edit-vcc.component.html',
  selector: 'edit-vcc',
  styleUrls: ['./edit-vcc.component.css']
})

export class EditVccComponent implements OnInit {
  @Input() display: boolean;
  @Input() rowData;
  @Input() vccDetails;

  @Output() displayChange = new EventEmitter();
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('vccEditForm') public vccEditForm: NgForm;


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
  displayTo: boolean;
  typeId: any;
  mailCampaginId: any;
  result: { id: number; name: any; }[];
  emailRecipientTypeId: any;



  constructor(private vccService: VccService, private notificationService: NotificationService,
    private notify: NotifyService, private sharedDataService: ShareDataService, private phoneFormat: PhoneFormatPipe) {
  }

  ngOnInit() {
    // this.isEditPermission = this.sharedDataService.isGrantedPermission(AppConsts.perMissionData.PagesManageCorporationsEdit);
    this.currentUser = this.sharedDataService.getUserValue();
    this.vccDetails.workingHourFrom = '';
    this.vccDetails.workingHourTo = '';
    if (this.vccDetails.workingHour) {
      let input = this.vccDetails.workingHour;
      let from = input.split('-');
      if (typeof from[0] != 'undefined') {
         this.vccDetails.workingHourFrom = from[0].trim(); 
      }

      if (typeof from[1] != 'undefined') {
         this.vccDetails.workingHourTo = from[1].trim();
      }
    }

  }



  onSave() {
    this.submittedError = false;

    const sTime = moment(this.vccDetails.workingHourFrom,'hh:mm a');
    const eTime = moment(this.vccDetails.workingHourTo,'hh:mm a');
    
    if (sTime && eTime) {
      let x = eTime.isBefore(sTime);
      if (x) {
        this.submittedError = true;
        this.vccEditForm.controls['workingHourTo'].setErrors({ 'incorrect': true});
        return ;
      }
      else {
        this.vccEditForm.controls['workingHourTo'].setErrors(null);
      }
    }

    if (!this.vccEditForm.valid) {
      this.submittedError = true;
      return;
    }

    

      this.vccDetails.workingHour  = this.vccDetails.workingHourFrom + ' - ' + this.vccDetails.workingHourTo;

      this.vccService.updateVccFacility(this.vccDetails).subscribe(res => {
        this.isSaved = true;
        this.onClose();
      })
    
  }




  onClose() {
    if (this.vccEditForm.dirty && !this.isSaved) {
      this.notificationService.activate(AppConsts.message.notification_Default_ValidationText, AppConsts.message.notification_Default_Message, AppConsts.message.notification_Default_OkButton).then(responseOK => {
        if (responseOK) {
          this.displayChange.emit(false);
        }
      });
    }
    else if (!this.vccEditForm.dirty) {
      this.displayChange.emit(false);
    } else {
      this.displayChange.emit(true);
    }

  }


}
