import { NgModule } from '@angular/core';
import { AppointmentHistoryComponent } from '../patients/profile/appointmentHistory/appointment-hisotry.component';
import { InsuranceComponent } from '../patients/profile/insurance/insurance.copmonet';
import { PatientProfileComponent } from '../patients/profile/patientProfile/patient-profile.component';
import { ProfileComponent } from '../patients/profile/profile.component';
import { UpcomingAppointmentComponent } from '../patients/profile/upcomingAppointments/upcoming-appointment.cmponent';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { MvpPaginationModule } from './pagination/mvp-pagination.module';

@NgModule({
  imports: [
   CommonModule,
   SharedModule.forRoot(),
   MvpPaginationModule.forRoot(),

  ],
  declarations: [
    ProfileComponent,
    AppointmentHistoryComponent,
    InsuranceComponent,
    PatientProfileComponent,
    UpcomingAppointmentComponent

  ],
  exports:[
    ProfileComponent,
    AppointmentHistoryComponent,
    InsuranceComponent,
    PatientProfileComponent,
    UpcomingAppointmentComponent
  ],
  providers: [

  ],


})
export class ProfileCommonModule { }
