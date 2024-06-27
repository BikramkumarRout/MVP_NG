import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';
import { LoginComponent } from './user/login.component';
import { AppConsts } from './shared/core/common/app-constant';
import { HomeComponent } from './home/home.component';
const isIframe = window !== window.parent && !window.opener;
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>
          import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
      },
      {
        path: 'careers',
        loadChildren: () =>
          import('./home/careers/careers.module').then(m => m.CareersModule)
      },
     
       { path: 'home', component: HomeComponent },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        data: { permission: AppConsts.perMissionData.PagesCommonDashboard },
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },     
     
      {
        path: 'manage-site',
        canActivate: [AuthGuard],
        data: { permission: AppConsts.perMissionData.PageManageSiteView },
        loadChildren: () =>
          import('./manage-site/manage-site.module').then(m => m.ManageSiteModule)
      },
      {
        path: 'setting',
        canActivate: [AuthGuard],
        data: { permission: 'Pages.appointment' },
        loadChildren: () =>
          import('./settings/setting.module').then(m => m.SettingModule)
      },
      

      { path: '', redirectTo: 'home', pathMatch: 'full' },      
       { path: '**', component: PageNotFoundComponent }
    ],
    {useHash:false})   
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
