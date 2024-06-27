import { DatePipe } from '@angular/common';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { ReferalPopupDto } from './referal-popup';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { ReferalService } from './referal-popup.service';


@Component({
  selector: 'referal-popup',
  templateUrl: './referal-popup.component.html',
  styleUrls: ['./referal-popup.component.css']
})

export class ReferalPopupComponent implements OnInit {
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();
  @ViewChild('fileInput', { static: false }) el: ElementRef;
  @ViewChild('referalForm') public referalForm: NgForm;
  public referalDetails: ReferalPopupDto;
  date6;

  isChecked: boolean;
  public paitentFile: any = '';
  uploadedFile: any;
  files: any;
  facilityName;
  userName;
  submittedError: boolean;
  tranform_date: string;
  userId: any;
  mymodel: any;
  designation: any;
  dob: string;
  constructor(
    public datePipe: DatePipe, private referalService: ReferalService,
    private http: HttpClient,
    private sharedDataService: ShareDataService,
    private notify: NotifyService) {

  }
  ngOnInit() {
    this.getRole();
    this.referalDetails = new ReferalPopupDto();
  }

  onClose() {
    this.displayChange.emit(false);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

  onSelectReferral(event) {
    if (event.target.checked) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }


  onFileChanged(event) {
    if (event.currentTarget.files[0].type == "application/pdf") {
      this.files = event.currentTarget.files[0];
      let filename = event.currentTarget.files.length > 0 ? event.currentTarget.files[0].name : '';
      this.paitentFile = filename;
    } else {
      this.paitentFile = "";
    }
  }

  onFileDropped(event) {
    if (event[0].type == "application/pdf") {
      if (!event.target) {
        for (let index = 0; index < event.length; index++) {
          this.files = event[index];
        }
      } else {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.files = file;
        }
      }
      this.paitentFile = this.files?.name;
    }

  }

  onUpload() {
    this.dob = this.datePipe.transform(this.referalDetails.dob, 'MM/dd/yyyy');
    let formData = new FormData();
    formData.append(this.paitentFile, this.files);
    formData.append("facilityName", this.facilityName);
    formData.append("userName", this.userName);
    formData.append("userId", this.userId);
    formData.append("firstName", this.referalDetails.firstName);
    formData.append("lastName", this.referalDetails.lastName);
    formData.append("dob", this.dob);
    this.referalService.uploadFile(formData).subscribe(res => {
      this.notify.success(AppConsts.message.referMessage);
      setTimeout(() => {
        this.display = false;
      }, 2000);
    })
  }

  reset() {
    this.paitentFile = "";
    this.el.nativeElement.value = "";
  }

  getRole() {
    let user = this.sharedDataService.getUser();
    this.userName = user.userName;
    this.userId = user.id;
    this.facilityName = this.sharedDataService.getSelectedFacilityName();


  }


  onSaveReferal() {
    this.submittedError = false;
    if (!this.referalForm.valid) {
      this.submittedError = true;
      return;
    }
  }

}