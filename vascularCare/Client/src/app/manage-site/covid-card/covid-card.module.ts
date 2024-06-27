import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CovidGuardRoutingModule } from './covid-card.routing.module';
import { UploadCovidCardComponent } from './upload-covidCard/upload-covidCard.component';
import { CovidCardComponent } from './covid-card.component';
import { CovidCardService } from './covid-card.service';
import { SpinnerManualModule } from 'src/app/shared/core/common/spinner/spinner-manual.module';
import { CovidCardViewComponent } from './covid-card-view/covid-card-view.component';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    SpinnerManualModule,
    CovidGuardRoutingModule
  ],
  declarations: [
    CovidCardComponent,
    UploadCovidCardComponent,
    CovidCardViewComponent
  ],
  exports: [
    CovidCardComponent,
    UploadCovidCardComponent,
    CovidCardViewComponent
  ],
  providers: [CovidCardService],
})
export class CovidCardModule { }
