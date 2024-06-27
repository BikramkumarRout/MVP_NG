import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';

const analytisRoutes: Routes = [
    {
        path: '',
        component: AnalyticsComponent

    },
];

@NgModule({
    imports: [
        RouterModule.forChild(analytisRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AnalyticsRoutingModule {
}
