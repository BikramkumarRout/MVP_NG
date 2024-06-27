import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSiteComponent } from '../manage-site/manage-site.component';

const manageSiteRoutes: Routes = [
  {
    path: '',
    component: ManageSiteComponent,
    children: [
      {
        path: '',
        redirectTo:'manage-corporations',
        pathMatch: 'full' 
      },
      {
        path: 'manage-corporations',
        loadChildren: () =>
          import('./corporations/corporations.module').then(m => m.CorporationsModule)
      },
      {
        path: 'manage-permissions',
        loadChildren: () =>
          import('./manage-permission/manage-permission.module').then(m => m.ManagePermissionModule)
      },
      {
        path: 'manage-roles',
        loadChildren: () =>
          import('./roles/role.module').then(m => m.RoleModule)
      },
      {
        path: 'manage-users',
        loadChildren: () =>
          import('./manage-user/manage-user.module').then(m => m.ManageUserModule)
      },
      {
        path: 'covid-card',
        loadChildren: () =>
          import('./covid-card/covid-card.module').then(m => m.CovidCardModule)
      },
      {
        path: 'mail-campaign-management',
        loadChildren: () =>
          import('./mail-campaign/mail-campaign-management.module').then(m => m.MailCampaignManagementModule)
      },
      {
        path: 'application-setting',
        loadChildren: () =>
          import('./application-setting/application-setting.module').then(m => m.ApplicationSettingModule)
      },
      {
        path: 'email-manager',
        loadChildren: () =>
          import('./email-manager/email-manager.module').then(m => m.EmailManagerModule)
      },
      {
        path: 'facilities',
        loadChildren: () =>
          import('./facilities/facilities.module').then(m => m.FacilitiesModule)
      },
      {
        path: 'vcc',
        loadChildren: () =>
          import('./manage-vcc/vcc-listing.module').then(m => m.VccModule)
      },
      {
        path: 'hr-menu',
        loadChildren: () =>
          import('./hr/hr.module').then(m => m.HRListingModule)
      },
      {
        path: 'bio-upload',
        loadChildren: () =>
          import('./bio-upload/bio-upload.module').then(m => m.BioUploadModule)
      }
    ]
  },



];

@NgModule({
  imports: [
    RouterModule.forChild(manageSiteRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ManageSiteRoutingModule {
}
