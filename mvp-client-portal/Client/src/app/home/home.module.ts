import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AboutModule } from './about/about.module';
import { ServicesModule } from './services/services.module';
import { WhoweareModule } from './who-we-are/whoweare.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { LocationsModule } from './locations/locations.module';
// import { CareersModule } from './careers/careers.module';
import { ClinicalTeamModule } from './clinical-team/clinicalteam.module';
import { LeadershipTeamModule } from './leadership-team/leadershipteam.module';


import { ContactModule } from './contact/contact.module';
import { HomeComponent } from './home.component';
import { HelpFormModule } from './help-form/help.module';

 
@NgModule({
  imports: [
    SharedModule.forRoot(),    
  
    ContactModule,
    AboutModule,
    ServicesModule,
    WhoweareModule,
    TestimonialsModule,
    LocationsModule,
    // CareersModule,
    ClinicalTeamModule,
    LeadershipTeamModule,
    HelpFormModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ]),
  ],
  declarations: [
    HomeComponent,
   ],
  exports: [
    HomeComponent

  ],
  providers: [

  ],

})
export class HomeModule { }
