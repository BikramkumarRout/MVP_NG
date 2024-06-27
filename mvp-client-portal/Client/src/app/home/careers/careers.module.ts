import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { CareersComponent } from './careers.component';
import { HelpFormModule } from 'src/app/home/help-form/help.module';
import { CareersService } from './careers.service';
import { JobsModule } from './jobs/jobs.module';
import { ContactService } from '../contact/contact.service';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    
    JobsModule,
    // HelpFormModule,
    RouterModule.forChild([
      {
        path: '',
        component: CareersComponent,
        children: [
          {path: 'jobs',
          loadChildren: () =>
          import('./jobs/jobs.module').then(m => m.JobsModule)
      },
        
    ]
       
  } 
      
    ]),
  

  ],
  declarations: [
    CareersComponent,
  ],
  exports: [

  ],
  providers: [
    CareersService,ContactService
  ],

})
export class CareersModule { }
