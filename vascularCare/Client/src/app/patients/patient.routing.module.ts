import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';


const patientRoutes: Routes = [
    {
        path: '',
        component: PatientComponent
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(patientRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PatientRoutingModule {
}
