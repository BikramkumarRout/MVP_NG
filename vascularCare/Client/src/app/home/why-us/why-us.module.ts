import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactModule } from '../contact/contact.module';
import { WhyUsComponent } from './why-us.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    ContactModule,
    RouterModule.forChild([
      {
        path: 'why-us',
        component: WhyUsComponent
      },
    ]),
  ],
  declarations: [
    WhyUsComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class WhyUsModule { }