import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from '../appointments/appointment.component';
import { DashboardComponent } from './dashboard.component';

const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        // children: [
        //     {
        //         path: 'vcc-appointments',
        //         loadChildren: () =>
        //             import('./vcc-appointments/vcc-appointments.module').then(m => m.VccAppointmentModule)
        //     }
        // ]
    },
    {
        path: 'appointment',
        component: AppointmentsComponent

    },
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {
}
