import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { SpinnerManualModule } from '../shared/core/common/spinner/spinner-manual.module';
import { FacilityCommonModule } from '../shared/facility-common.module';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsRoutingModule } from './analytics.routing.module';
import { ChartComponent } from './chart/chart.component';
import { StatListComponent } from './stat-list/stat-list.component';
import { DosHistoryComponent } from './stats/dos-history.component';


@NgModule({
  imports: [
    SharedModule.forRoot(),
    AnalyticsRoutingModule,
    HttpClientModule,
    FacilityCommonModule,
    DashboardModule,
     SpinnerManualModule
  ],
  declarations: [
    AnalyticsComponent,
    StatListComponent,
    DosHistoryComponent,
    ChartComponent
  ],
  exports: [

  ],
  providers: []
})
export class AnalyticsModule { }
