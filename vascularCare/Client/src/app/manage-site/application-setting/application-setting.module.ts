import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { SpinnerManualModule } from 'src/app/shared/core/common/spinner/spinner-manual.module';
import { RouterModule } from '@angular/router';
import { ApplicationSettingComponent } from './application-setting.component';
import { ApplicationSettingService } from './application-setting.service';
import { FormBuilderService } from './formBuilder.service';


@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerManualModule,
    // MailCampaignManagementRoutingModule
    RouterModule.forChild([
        {
          path: '',
          component: ApplicationSettingComponent
        }
  
      ])
  ],
  declarations: [
    ApplicationSettingComponent
  ],
  exports: [
    ApplicationSettingComponent
  ],
  providers: [ApplicationSettingService,FormBuilderService],
})
export class ApplicationSettingModule { }
