import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicesComponent } from './services.component';

import { DialysisModule } from './dialysis/dialysis.module';
import { PeripheralModule } from './peripheral/peripheral.module';
import { UterineModule } from './uterine/uterine.module';
import { HemorrhoidalModule } from './hemorrhoidal/hemorrhoidal.module';
import { PelvicModule } from './pelvic/pelvic.module';
import { ProstaticModule } from './prostatic/prostatic.module';
import { VericoseModule } from './vericose/vericose.module';
import { VaricoceleModule } from './varicocele/varicocele.module';
import { HelpFormModule } from 'src/app/home/help-form/help.module';



@NgModule({
  imports: [
    SharedModule.forRoot(),
    DialysisModule,
    PeripheralModule,
    UterineModule,
    HemorrhoidalModule,
    PelvicModule,
    ProstaticModule,
    VericoseModule,
    VaricoceleModule,
    HelpFormModule,

    RouterModule.forChild([
      {
        path: 'services',
        component: ServicesComponent
      },
    ]),
  ],
  declarations: [
    ServicesComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class ServicesModule { }
