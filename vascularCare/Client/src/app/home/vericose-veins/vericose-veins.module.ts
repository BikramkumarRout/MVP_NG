import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactModule } from '../contact/contact.module';
import { VericoseVeinsComponent } from './vericose-veins.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    ContactModule,
    RouterModule.forChild([
      {
        path: 'vericose-veins',
        component: VericoseVeinsComponent

      },
    ]),
  ],
  declarations: [
    VericoseVeinsComponent

  ],
  exports: [

  ],
  providers: [

  ],

})
export class VericoseVeinsModule { }
