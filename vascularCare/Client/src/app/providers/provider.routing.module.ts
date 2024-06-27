import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderComponent } from './provider.component';

const providerRoutes: Routes = [
    {
        path: '',
        component: ProviderComponent

    },
];

@NgModule({
    imports: [
        RouterModule.forChild(providerRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProviderRoutingModule {
}
