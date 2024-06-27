import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PrimengTableHelper } from 'src/app/shared/pagination/PrimengTableHelper';
import { AppointmentHistoryPaging } from './appointmentHistory/appointment-history';
import { ProfileService } from './profile.service';
import { UpcomingAppointmentPaging } from './upcomingAppointments/upcoming-appointment';

@Component({
  selector: 'patient-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  @Output() patientProfileCloseEvent = new EventEmitter<boolean>();
  @Input() patientId: number;
  @Input() facilityId: number;
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();
  public profileData: any = [];
  public insuranceData: any = [];
  public patientHistory: any = [];
  public upcomingAppointment: any = [];
  public isPatientProfile = false;
  public isInsurance = false;
  public isAppointmentHistory = false;
  public isupcomingAppointments = false;
  public childPageCalled: string;
  public appHistorypageCalled = "appHistory";
  public upcomingAppPageCAlled = "upcomingAppointments";
  primengTableHelper: PrimengTableHelper;
  appointmentHistoryPaging: AppointmentHistoryPaging;
  upcomingAppointmentPaging: UpcomingAppointmentPaging;
  list: any[];
  limit: any = 20;
  startValue: number;
  lastValue: any;
  public totalRecord: number;


  constructor( private profileService: ProfileService) {
    this.primengTableHelper = new PrimengTableHelper();
    this.appointmentHistoryPaging = new AppointmentHistoryPaging();
    this.upcomingAppointmentPaging = new UpcomingAppointmentPaging();

   }

  ngOnInit() {
    this.isPatientProfile = true;
    this.isInsurance = false;
    this.isAppointmentHistory = false;
    this.isupcomingAppointments = false;
    this.onPatientProfile();
  }

  onPatientProfile() {
    this.isPatientProfile = true;
    this.isInsurance = false;
    this.isAppointmentHistory = false;
    this.isupcomingAppointments = false;
    this.profileService.getPatientProfile(this.patientId, this.facilityId).subscribe(profile => {
      this.profileData = profile.result;
    })
  }

  onInsurance() {
    this.isPatientProfile = false;
    this.isInsurance = true;
    this.isAppointmentHistory = false;
    this.isupcomingAppointments = false;
    this.profileService.getPatientInsurance(this.patientId, this.facilityId).subscribe(Insurance => {
      this.insuranceData = Insurance.result;
    })
  }

  onAppointmentsHistory() {
    this.isPatientProfile = false;
    this.isInsurance = false;
    this.isAppointmentHistory = true;
    this.isupcomingAppointments = false;
    this.profileService.getPatientHistory(this.appointmentHistoryPaging.filter,
      this.appointmentHistoryPaging.Sorting,this.appointmentHistoryPaging.skipCount,this.appointmentHistoryPaging.MaxResultCount,
      this.patientId, this.facilityId).subscribe(result => {
      this.totalRecord=result.result.totalCount;      
      this.patientHistory = result.result.appHistory;
    })
  }

  onUpcomingAppointments() {
    this.childPageCalled = this.upcomingAppointment;
    this.isPatientProfile = false;
    this.isInsurance = false;
    this.isAppointmentHistory = false;
    this.isupcomingAppointments = true;
  }

  onPatientProfileClose() {
    this.patientProfileCloseEvent.emit(true);
  }

  onClose() {
    this.displayChange.emit(false);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

}
