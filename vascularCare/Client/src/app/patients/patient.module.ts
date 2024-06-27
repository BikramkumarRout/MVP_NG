import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PatientRoutingModule } from './patient.routing.module';
import { PatientComponent } from './patient.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileCommonModule } from '../shared/profile-common-module';
import { MvpPaginationModule } from '../shared/pagination/mvp-pagination.module';
import { PatientService } from './patient.service';
import { FacilityCommonModule } from '../shared/facility-common.module';
import { FormsModule } from '@angular/forms';
import { SpinnerManualModule } from '../shared/core/common/spinner/spinner-manual.module';


@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    FormsModule,
    PatientRoutingModule,
    FacilityCommonModule,
    MvpPaginationModule.forRoot(),
    ProfileCommonModule,
    SpinnerManualModule
  ],
  declarations: [
    PatientComponent,


  ],
  exports: [

  ],
  providers: [PatientService],
})
export class PatientModule { }
