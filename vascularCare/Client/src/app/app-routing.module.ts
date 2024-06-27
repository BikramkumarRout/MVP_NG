import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';
import { LoginComponent } from './user/login.component';
import { AppConsts } from './shared/core/common/app-constant';
const isIframe = window !== window.parent && !window.opener;



@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'home',
        data: { permission: AppConsts.routingPerMission.PageHome },
        loadChildren: () =>
          import('./home/home.module').then(m => m.HomeModule)
      },
      
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        data: { permission: AppConsts.routingPerMission.PagesDashboard },
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      
      {
        path: 'appointment',
        canActivate: [AuthGuard],
        // data: { permission: AppConsts.perMissionData.PagesAppointmentsView },
        data: { permission: AppConsts.routingPerMission.PagesAppointments },
        loadChildren: () =>
          import('./appointments/appointment.module').then(m => m.AppointmentModule)
      },
      {
        path: 'patient',
        canActivate: [AuthGuard],
        data: { permission: AppConsts.routingPerMission.PagesPatients },
        loadChildren: () =>
          import('./patients/patient.module').then(m => m.PatientModule)
      },
      {
        path: 'provider',
        canActivate: [AuthGuard],
        data: { permission: AppConsts.routingPerMission.PagesProvider },
        loadChildren: () =>
          import('./providers/provider.module').then(m => m.ProviderModule)
      },
      {
        path: 'manage-site',
        canActivate: [AuthGuard],
        data: { permission: AppConsts.routingPerMission.PageManageSite },
        loadChildren: () =>
          import('./manage-site/manage-site.module').then(m => m.ManageSiteModule)
      },
      {
        path: 'setting',
        canActivate: [AuthGuard],
        data: { permission: AppConsts.routingPerMission.PageHome },
        loadChildren: () =>
          import('./settings/setting.module').then(m => m.SettingModule)
      },
      {
        path: 'analytics',
        canActivate: [AuthGuard],
        data: { permission: AppConsts.routingPerMission.PageAnalytics },
        loadChildren: () =>
          import('./analytics/analytics.module').then(m => m.AnalyticsModule)
      },
      {
        path: 'careers',
        loadChildren: () =>
          import('./home/careers/carrier.module').then(m => m.CarriersModule)
      },
      
      {
        path: 'default',
        loadChildren: () =>
          import('./default/default.module').then(m => m.DefaultModule)
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>
          import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ],
    
      {
        useHash: false,
        scrollPositionRestoration: 'top',
        // Don't perform initial navigation in iframes
        //initialNavigation: !isIframe ? 'enabled' : 'disabled',
        // preloadingStrategy: SelectiveStrategy,
        relativeLinkResolution: 'legacy'
      })   // , { enableTracing: true, preloadingStrategy: SelectiveStrategy }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
