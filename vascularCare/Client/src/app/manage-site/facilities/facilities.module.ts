import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FacilitiesComponent } from './facilities.component';
import { FacilitiesService } from './facilities.service';
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
        component: FacilitiesComponent
      }

    ])
  ],
  declarations: [
    FacilitiesComponent
  ],
  exports: [
    FacilitiesComponent
  ],
  providers: [FacilitiesService],
})
export class FacilitiesModule { }
