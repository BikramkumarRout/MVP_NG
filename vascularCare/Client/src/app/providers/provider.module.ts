import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CovidCardModule } from '../manage-site/covid-card/covid-card.module';

import { SpinnerManualModule } from '../shared/core/common/spinner/spinner-manual.module';
import { FacilityCommonModule } from '../shared/facility-common.module';
import { MvpPaginationModule } from '../shared/pagination/mvp-pagination.module';
import { PaginationService } from '../shared/pagination/pagination.service';

import { SharedModule } from '../shared/shared.module';
import { ProviderComponent } from './provider.component';

import { ProviderRoutingModule } from './provider.routing.module';
import { ProviderService } from './provider.service';


@NgModule({
  imports: [
    SharedModule.forRoot(),
    ProviderRoutingModule,
    HttpClientModule,
    FacilityCommonModule,
    MvpPaginationModule.forRoot(),
    SpinnerManualModule,
    CovidCardModule

  ],
  declarations: [
    ProviderComponent,

  ],
  exports: [

  ],
  providers: [PaginationService]
})
export class ProviderModule { }
