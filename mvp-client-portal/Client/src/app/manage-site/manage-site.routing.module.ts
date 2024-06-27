import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSiteComponent } from '../manage-site/manage-site.component';

const manageSiteRoutes: Routes = [
  {
    path: '',
    component: ManageSiteComponent,
    children: [
     
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
