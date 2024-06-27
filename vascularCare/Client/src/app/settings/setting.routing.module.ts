import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';



const settingRoutes: Routes = [
    {
        path: '',
        component: SettingComponent,
        children: [
            {
              path: '',
              redirectTo:'preferences',
              pathMatch: 'full' 
            },
            {
              path: 'preferences',
              loadChildren: () =>
                import('./preferences/preferences.module').then(m => m.PreferencesModule)
            },
            {
              path: 'reset-password',
              loadChildren: () =>
                import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
            },
            
         
          ]
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
