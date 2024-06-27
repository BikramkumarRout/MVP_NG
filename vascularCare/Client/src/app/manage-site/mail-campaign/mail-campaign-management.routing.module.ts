import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailCampaginManagementComponent } from './mail-campaign-management.component';


const mailCampaignManagementRoutes: Routes = [
    {
        path: '',
        component:  MailCampaginManagementComponent
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(mailCampaignManagementRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MailCampaignManagementRoutingModule {
}
