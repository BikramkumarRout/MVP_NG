import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointment.component';

const appointmentRoutes: Routes = [
    {
        path: '',
        component: AppointmentsComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(appointmentRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppointmentsRoutingModule {
}
