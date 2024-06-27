import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationsComponent } from './locations.component';
import { LocationsListComponent } from './locations-list/list.component';
import { LocationDetailsModule } from './locations-details/details.module';


 
@NgModule({
  imports: [
    SharedModule.forRoot(),
    LocationDetailsModule,
    RouterModule.forChild([
      {
        path: 'locations',
        component: LocationsComponent
      },
     ]),
  ],
  declarations: [
    LocationsComponent,
    LocationsListComponent,
   ],
  exports: [
    LocationsListComponent,
  ],
  providers: [

  ],

})
export class LocationsModule { }
