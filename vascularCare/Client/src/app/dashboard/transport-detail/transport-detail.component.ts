import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { DashboardService } from '../dashboard.service';
import { GetTransportDetailDto, TransportDetailDto } from './transport-detail';

@Component({
  selector: 'transport-detail',
  templateUrl: './transport-detail.component.html',
  styleUrls: ['./transport-detail.component.css']
})

export class TransportDetailComponent implements OnInit {
  @Input() displayTransportPopUp;
  @Output() displayChange = new EventEmitter();
  @ViewChild('transportDetailsForm') public transportDetailsForm: NgForm;
  @Input() vccPatientData;
  @Input() transportDetail;

  public submittedError: boolean;
  // public transportDetail: TransportDetailDto;
  public getTransportDetail: GetTransportDetailDto;
  public isSaved: boolean;
  public currentUser: any;
  public name: any;
  public date: any;
  public filterDate: any;
  public time: any;
  public arrivalDate: any;
  public submittedError1: boolean;
  selectedLevel: any;
  isEscort: any;

  constructor(private dashboardService: DashboardService, private sharedDataService: ShareDataService) { }



  ngOnInit() {
    this.currentUser = this.sharedDataService.getUserValue();
    // this.transportDetail = new TransportDetailDto();
    this.getTransportDetail = new GetTransportDetailDto();
    this.name = this.currentUser.userName;
    this.date = this.vccPatientData.date;
    this.time = this.vccPatientData.time;
    this.filterDate = this.date.split(/[ ,]+/);
    this.date = this.filterDate[1];
    this.arrivalDate = this.filterDate[0];
    this.transportDetail.name = this.name;
    this.transportDetail.arrivalDate = this.arrivalDate;
    

  }


  selected(event) {
    if (this.transportDetail.levelOfService === "0") {
      this.isEscort = true;
    }
  }

  onClose() {
    this.displayChange.emit(false);
  }

  onSave() {
    this.submittedError = false;
    if (this.transportDetailsForm.form.value.levelOfService === undefined) {
      this.submittedError1 = true;
    }
    if (!this.transportDetailsForm.valid) {
      this.submittedError = true;
      return;
    }
    this.transportDetail.userId = 0;
    this.transportDetail.facilityId = this.vccPatientData.facilityId;
    this.transportDetail.patientId = this.vccPatientData.patientId;
    this.transportDetail.scheduledTime = this.vccPatientData.date;
    this.transportDetail.levelOfService = +this.transportDetail.levelOfService;
    this.dashboardService.saveUpdateVCCTransport(this.transportDetail).subscribe(data => {
      this.isSaved = true;
      this.onClose();
    })
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  // getVccDetailTransport() {
  //   this.getTransportDetail.facilityId = this.vccPatientData.facilityId;
  //   this.getTransportDetail.patientId = this.vccPatientData.patientId;
  //   this.getTransportDetail.scheduledTime = this.vccPatientData.date;
  //   this.dashboardService.getVCCTransportDetail(this.getTransportDetail).subscribe(
  //     response => {
  //       // this.listing = response.result;
  //     });
  // }

}
