import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactModule } from '../contact/contact.module';
import { ProstaticArteryComponent } from './prostatic-artery.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    ContactModule,
    RouterModule.forChild([
      {
        path: 'prostatic-artery',
        component: ProstaticArteryComponent
      },
    ]),
  ],
  declarations: [
    ProstaticArteryComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class ProstaticArteryModule { }
