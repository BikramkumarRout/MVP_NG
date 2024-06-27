import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';



const settingRoutes: Routes = [
    {
        path: '',
        component: SettingComponent
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(settingRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SettingRoutingModule {
}
