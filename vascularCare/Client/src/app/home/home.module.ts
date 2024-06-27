import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CarriersModule } from './careers/carrier.module';
import { TeamModule } from './about/team/team.module';
import { ContactModule } from './contact/contact.module';
import { HomeComponent } from './home.component';
import { LocationsModule } from './locations/locations.module';
import { ServicesModule } from './services/services.module';
import { PelvicCongestionSyndromeModule } from './pelvic-congestion-syndrome/pelvic-congestion-syndrome.module';
import { DialysisModule } from './dialysis-access-management/dialysis-access-management.module';
import { PeripheralArteryModule } from './peripheral-artery-disease/peripheral-artery-disease.module';
import { UterineFibroidsModule } from './uterine-fibroids/uterine-fibroids.module';
import { HemorrhoidalDiseaseModule } from './hemorrhoidal-disease/hemorrhoidal-disease.module';
import { AbrahamKnollModule } from './abraham-knoll/abraham-knoll.module';
import { DanielStockModule } from './daniel-stok/daniel-stok.module';
import { EliezerHalpertModule } from './eliezer-halpert/eliezer-halpert.module';
import { EmineCosarModule } from './emine-cosar/emine-cosar.module';
import { EricBerkowitzModule } from './eric-berkowitz/eric-berkowitz.module';
import { MichelleMisitiKenneyModule } from './michelle-misiti-kenney/michelle-misiti-kenney.module';
import { JobsModule } from './careers/jobs/jobs.module';


import { HttpClientModule } from '@angular/common/http';
import { HomeTopBarComponent } from '../layout/home-topbar.component';
import { AmirSalemModule } from './amir-salem/amir-salem.module';
import { HarryTsouModule } from './harry-tsou/harry-tsou.module';
import { IftikharAhmadModule } from './iftikhar-ahmad/iftikhar-ahmad.module';
import { MuratCosarModule } from './murat-cosar/murat-cosar.module';
import { LeadershipTeamModule } from './leadership-team/leadership-team.module';
import { ClinicalTeamModule } from './clinical-team/clinical-team.module';
import { WhyUsModule } from './why-us/why-us.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { ProstaticArteryModule } from './prostatic-artery/prostatic-artery.module';
import { VericoseVeinsModule } from './vericose-veins/vericose-veins.module';
import { VaricoceleEmbolizationModule } from './varicocele-embolization/varicocele-embolization.module';
import { WhoWeAreModule } from './who-we-are/who-we-are.module';
import { EssexModule } from './locations/essex/essex.module';
import { BronoxModule } from './locations/bronox/bronox.module';
import { BrooklynModule } from './locations/brooklyn/brooklyn.module';
import { QueensModule } from './locations/queens/queens.module';
import { MassapequaModule } from './locations/massapequa/massapequa.module';
import { RocklandModule } from './locations/rockland/rockland.module';
import { WilliamsburgModule } from './locations/williamsburg/williamsburg.module';
import { WestchesterModule } from './locations/westchester/westchester.module';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { JoelwolfModule } from './joel-wolf/joel-wolf.module';
import { ClinicalTestModule } from './clinical-test/clinical-test.module';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    TeamModule,
    ServicesModule,
    ContactModule,
    PelvicCongestionSyndromeModule,
    DialysisModule,
    PeripheralArteryModule,
    UterineFibroidsModule,
    HemorrhoidalDiseaseModule,
    AbrahamKnollModule,
    DanielStockModule,
    EliezerHalpertModule,
    EmineCosarModule,
    EricBerkowitzModule,
    MichelleMisitiKenneyModule,
    AmirSalemModule,
    HarryTsouModule,
    IftikharAhmadModule,
    MuratCosarModule,
    LeadershipTeamModule,
    ClinicalTeamModule,
    TestimonialsModule,
    WhyUsModule,
    ProstaticArteryModule,
    VericoseVeinsModule,
    VaricoceleEmbolizationModule,
    WhoWeAreModule,
    EssexModule,
    BronoxModule,
    BrooklynModule,
    QueensModule,
    MassapequaModule,
    RocklandModule,
    WestchesterModule,
    LocationsModule,
    WilliamsburgModule,
    JoelwolfModule,
    ClinicalTestModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }

    ]),
  ],
  declarations: [
    HomeComponent
  ],
  exports: [

  ],
  providers: [
  ],
  bootstrap: []

})
export class HomeModule { }
