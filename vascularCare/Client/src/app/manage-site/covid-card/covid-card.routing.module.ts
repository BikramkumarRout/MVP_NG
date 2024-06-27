import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidCardComponent } from './covid-card.component';


const covidGuardRoutes: Routes = [
    {
        path: '',
        component: CovidCardComponent 
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(covidGuardRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CovidGuardRoutingModule {
}
