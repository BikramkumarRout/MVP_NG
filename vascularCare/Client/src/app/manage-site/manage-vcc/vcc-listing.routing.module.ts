import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VccListingComponent } from './vcc-listing.component';


const vccRoutes: Routes = [
    {
        path: '',
        component:  VccListingComponent
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(vccRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ManageVccRoutingModule {
}
