
import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageSiteService } from '../manage-site.service';

import { Table } from 'primeng/table';


import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { ApplicationSettingService } from './application-setting.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { FormBuilderService } from './formBuilder.service';
import { appSettingDto } from './appSetting';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { NotificationService } from 'src/app/shared/core/common/notification';

@Component({
  templateUrl: './application-setting.component.html',
  selector: 'application-setting',
  styleUrls: ['./application-setting.component.css']
})
export class ApplicationSettingComponent implements OnInit {
  @ViewChild('dt2') table: Table;
  public display: boolean = false;
  public appSettingForm: UntypedFormGroup;
  public listingData;
  public searchGlobalText;
  isNoRecorsFound: boolean = false;
  isEditPermission: boolean;
  stateList;
  item: any;
  elements: any[];
  form: any;
  public appSettingDetail: appSettingDto;
  submitted: any;
  isSpinnerVisible: boolean = false;
  isEdit: any;
  isSaved: boolean;
  constructor(private notificationService: NotificationService,private sharedDataService: ShareDataService, private notify: NotifyService, private fb: UntypedFormBuilder,
    private applicationSettingService: ApplicationSettingService, private _formBuilderService: FormBuilderService
  ) {

  }

  ngOnInit() {
    this.onGetApplicationSetting();
    this.appSettingDetail = new appSettingDto();

    // this.onGetData();

  }

  onGetApplicationSetting() {
    this.isSpinnerVisible = true;
    this.applicationSettingService.getAppSetting().subscribe(res => {
      this.listingData = res.result;     
      this.item = this.listingData;
      this.appSettingForm = this.fb.group({
        value: new UntypedFormControl(this.listingData[0].value, [Validators.required]),
        key: new UntypedFormControl(this.listingData[0].key, [Validators.required]),
        label: new UntypedFormControl(this.listingData[0].label, [Validators.required]),
        id: new UntypedFormControl(this.listingData[0].id, [Validators.required]),
        fieldType: new UntypedFormControl(this.listingData[0].fieldType, [Validators.required]),
        page: new UntypedFormControl(this.listingData[0].page, [Validators.required]),


      });
    })
    this.isSpinnerVisible = false;
  }

  onSave() {
    if (this.appSettingForm.valid) {
      this.submitted = true;
    }
    let model = new appSettingDto();
    // this.applicationSettingService.saveApplicationSetting(this.appSettingForm.value.id, this.appSettingForm.value.key, this.appSettingForm.value.value, this.appSettingForm.value.fieldType, this.appSettingForm.value.label, this.appSettingForm.value.page).subscribe(res => {
      this.applicationSettingService.saveApplicationSetting(model).subscribe(res => {

      this.isSaved = true;
      this.notify.success(AppConsts.message.updateMessage);
      setTimeout(() => {
        this.isEdit=false
      }, 1500);
    })
    // this.ngOnInit();
  }

  passwordEditClicked(e) {
    if (e) {

      this.isEdit = true;
    }
  }

  onCancelClicked(e) {
    if (e) {
      if (this.appSettingForm.dirty && !this.isSaved) {
        this.notificationService.activate(AppConsts.message.notification_Default_ValidationText, AppConsts.message.notification_Default_Message, AppConsts.message.notification_Default_OkButton).then(responseOK => {
          if (responseOK) {
            this.isEdit = false;
            this.onGetApplicationSetting();
          }
        });
      }
      else if(!this.appSettingForm.dirty) {
        this.isEdit = false;
        this.onGetApplicationSetting();

      }else{
        this.isEdit = true;
      }
    }
  }
  private onGetData() {
    this.elements = [];
    this.applicationSettingService.getAppSetting().subscribe(response => {
      this.elements = response.result;
      this.form = this._formBuilderService.generateFormGroup(this.elements);
     

      // this.detailTabClick = true;
      // this.totalQuestion = this.elements.length;
      // if (this.totalQuestion > 0) {
      //     this.calculatetime();
      // }

    });

  }

}
