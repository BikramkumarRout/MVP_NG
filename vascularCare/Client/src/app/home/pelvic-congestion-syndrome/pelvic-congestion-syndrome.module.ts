import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactModule } from '../contact/contact.module';
import { PelvicCongestionSyndromeComponent } from './pelvic-congestion-syndrome.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    ContactModule,
    RouterModule.forChild([
      {
        path: 'pelvic-congestion-syndrome',
        component: PelvicCongestionSyndromeComponent
      },
    ]),
  ],
  declarations: [
    PelvicCongestionSyndromeComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class PelvicCongestionSyndromeModule { }
