import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ClinicalTeamService } from 'src/app/home/clinical-team/clinical-team.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BioUpdateComponent } from './bio-update/bio-update.component';
import { BioUploadComponent } from './bio-upload.component';
import { BioUploadService } from './bio-upload.service';
 

@NgModule({
  imports: [
    SharedModule.forRoot(),    
    RouterModule.forChild([
      {
        path: '',
        component: BioUploadComponent,
        
      },
      
    ]),
  ],
  declarations: [
    BioUploadComponent,
    BioUpdateComponent
  ],
  exports: [
    BioUploadComponent,
    BioUpdateComponent
  ],
  providers: [
    BioUploadService,
    ClinicalTeamService
  ],

})
export class BioUploadModule { }
