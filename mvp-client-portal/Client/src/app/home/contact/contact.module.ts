import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactComponent } from './contact.component';
import { ContactService } from './contact.service';
import { LocationsModule } from 'src/app/home/locations/locations.module';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    LocationsModule,
    RouterModule.forChild([
      {
        path: 'contact',
        component: ContactComponent
      },
    ]),
  ],
  declarations: [
    ContactComponent,
    ],
  exports: [

  ],
  providers: [
    ContactService
  ],

})
export class ContactModule { }
