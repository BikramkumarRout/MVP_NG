import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FacilityCommonModule } from '../shared/facility-common.module';
import { MvpPaginationModule } from '../shared/pagination/mvp-pagination.module';
import { ProfileCommonModule } from '../shared/profile-common-module';
import { SharedModule } from '../shared/shared.module';
import { AppointmentsComponent } from './appointment.component';
import { AppointmentsRoutingModule } from './appointment.routing.module';
import { AppointmentService } from './appointment.service';
import { AppointmentDetailComponent } from './appointmentDetails/appointmentDetail.component';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ProfileCommonModule,
    FacilityCommonModule,
    AppointmentsRoutingModule,
    MvpPaginationModule.forRoot()

  ],
  declarations: [
    AppointmentsComponent,
    AppointmentDetailComponent,


  ],
  exports: [
    AppointmentsComponent,
    AppointmentDetailComponent,


  ],
  providers: [AppointmentService]


})
export class AppointmentModule { }
