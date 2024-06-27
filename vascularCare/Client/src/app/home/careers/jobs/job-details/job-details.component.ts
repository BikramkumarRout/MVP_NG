import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { NoSanitizePipe } from 'src/app/shared/pipe/sanitizeHtml';
import { CareersService } from '../../careers.service';
import { JobDetailsService } from './job-details.service';
import { JobDetailDto } from './jobDetails';
@Component({
  selector: 'job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})

export class JobDetailsComponent implements OnInit {
  @ViewChild('dt2') table: Table;
  @ViewChild('fileInput', { static: false }) el: ElementRef;
  @Input() display: boolean;
  @Input() listingData;
  @Input() testEmail;
  @Input() mailCampaingId;
  @Input() isTesting;
  @Output() displayChange = new EventEmitter();

  public paitentFile: any = '';
  uploadedFile: any;
  files: any;
  isSpinnerVisible: boolean;
  jobId: string;
  jobDescription: string;
  public applicantName: string;
  submittedError: any;
  phoneNumber;
  public jobDetails: JobDetailDto;

  constructor(private careerService: CareersService, private http: HttpClient,
    private notify: NotifyService, private sanitize: NoSanitizePipe,
    private jobDetailsService:JobDetailsService) {

  }
  ngOnInit(): void {
    this.jobDetails = new JobDetailDto();

    // this.listingData.jobDescription = this.sanitize.transform(this.listingData.jobDescription);
  }


  onClose() {
    this.displayChange.emit(true);

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

  onFileChanged(event) {
    if (event.currentTarget.files[0].type == "application/pdf") {
      this.files = event.currentTarget.files[0];
      let filename = event.currentTarget.files.length > 0 ? event.currentTarget.files[0].name : '';
      this.paitentFile = filename;
    } else {
      this.paitentFile = "";
    }
  }

  reset() {
    this.paitentFile = "";
    this.el.nativeElement.value = "";
  }
  onUpload() {
    this.isSpinnerVisible = true;
    if(this.testEmail) {
      this.jobDetails.testEmailRecipents = this.testEmail;
    }
    let formData = new FormData();
    formData.append(this.paitentFile, this.files);
    formData.append("jobId", this.listingData.id);
    formData.append("applicantName", this.jobDetails.applName);
    formData.append("applicantEmail", this.jobDetails.emailId);
    formData.append("testEmailRecipents", this.jobDetails.testEmailRecipents);
    formData.append("mailCampaingId", this.mailCampaingId);
    formData.append("isTesting", this.isTesting);

    this.jobDetailsService.uploadFile(formData).subscribe(res => {
      this.notify.success(AppConsts.message.resumeMessage);
      setTimeout(() => {
        this.displayChange.emit(true);
        this.isSpinnerVisible = false;
      }, 4000);
    })
  }



}
