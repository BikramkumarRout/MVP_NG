import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { VccListingComponent } from './vcc-listing.component';
import { VccService } from './vcc-listing.service';
import { EditVccComponent } from './edit-vcc/edit-vcc.component';
import { FacilitiesService } from '../facilities/facilities.service';
import { SpinnerManualModule } from 'src/app/shared/core/common/spinner/spinner-manual.module';



@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    SpinnerManualModule,
    RouterModule.forChild([
      {
        path: '',
        component: VccListingComponent
      }

    ])
  ],
  declarations: [
    VccListingComponent,
    EditVccComponent
  ],
  exports: [
    VccListingComponent,
    EditVccComponent
  ],
  providers: [VccService,FacilitiesService],
})
export class VccModule { }
