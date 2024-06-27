import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations.component';

const locationsRoutes: Routes = [
    {
        path: 'location',
        component: LocationsComponent

    },
];

@NgModule({
    imports: [
        RouterModule.forChild(locationsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class LocationRoutingModule {
}
