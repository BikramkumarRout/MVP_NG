import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactModule } from '../contact/contact.module';
import { CareersComponent } from './careers.components';
import { CareersService } from './careers.service';
import { JobsModule } from './jobs/jobs.module';





@NgModule({
  imports: [
    SharedModule.forRoot(),
    JobsModule,
    ContactModule,
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
    CareersService
  ],

})
export class CarriersModule { }
