import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { PeripheralComponent } from './peripheral.component';
import { HelpFormModule } from 'src/app/home/help-form/help.module';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    HelpFormModule,
    RouterModule.forChild([
      {
        path: 'services/peripheral-artery-disease',
        component: PeripheralComponent
      },
    ]),
  ],
  declarations: [
    PeripheralComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class PeripheralModule { }
