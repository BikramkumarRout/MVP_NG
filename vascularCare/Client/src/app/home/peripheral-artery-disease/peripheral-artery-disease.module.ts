import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactModule } from '../contact/contact.module';
import { PeripheralArteryDiseaseComponent } from './peripheral-artery-disease.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    ContactModule,
    RouterModule.forChild([
      {
        path: 'peripheral-artery-disease',
        component: PeripheralArteryDiseaseComponent

      },
    ]),
  ],
  declarations: [
    PeripheralArteryDiseaseComponent

  ],
  exports: [

  ],
  providers: [

  ],

})
export class PeripheralArteryModule { }
