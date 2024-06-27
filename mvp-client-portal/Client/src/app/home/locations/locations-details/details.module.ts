import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationDetailsComponent } from './details.component';
 

@NgModule({
  imports: [
    SharedModule.forRoot(),
    //onSameUrlNavigation: 'reload'
    
    RouterModule.forChild([
      {
        path: 'locations/details/:name',
        component: LocationDetailsComponent,
        
      },
      
    ]),
  ],
  declarations: [
    LocationDetailsComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class LocationDetailsModule { }
