import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerManualModule } from 'src/app/shared/core/common/spinner/spinner-manual.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BioDetailsComponent } from './bio-details.component';
 

@NgModule({
  imports: [
    SharedModule.forRoot(),
    SpinnerManualModule,    
    RouterModule.forChild([
      {
        path: 'clinical-team/details/:name',
        component: BioDetailsComponent,
        
      },
      
    ]),
  ],
  declarations: [
    BioDetailsComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class BioDetailsModule { }
