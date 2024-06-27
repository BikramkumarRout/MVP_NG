import { NgModule } from '@angular/core';
import { RadioControlValueAccessor } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';

import { MvpPaginationModule } from '../shared/pagination/mvp-pagination.module';

import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardService } from './dashboard.service';



@NgModule({
  imports: [
    SharedModule.forRoot(),
    
    
    MvpPaginationModule.forRoot(),
    // UserModule,
    // DashboardRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        // children: [
        //   {
        //     path: 'vcc-appointments',
        //     loadChildren: () =>
        //       import('./vcc-appointments/vcc-appointments.module').then(m => m.VccAppointmentModule),
        //       outlet: 'vcc'
        //   }
        // ]
      },
      {
        path: 'appointment',
        //component: AppointmentsComponent
      },
    ]),
      // VccAppointmentModule,

  ],
  declarations: [
    DashboardComponent,
 
  ],
  exports: [

  ],
  providers: [
    DashboardService, DialogService
  ],

})
export class DashboardModule { }
