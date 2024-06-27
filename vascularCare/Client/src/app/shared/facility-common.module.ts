import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FacilityComponent } from './core/common/facility/facility.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
   CommonModule,
   SharedModule.forRoot(),

  ],
  declarations: [
    FacilityComponent

  ],
  exports:[
    FacilityComponent
  ],
  providers: [

  ],


})
export class FacilityCommonModule { }
