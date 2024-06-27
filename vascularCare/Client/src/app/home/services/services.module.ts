import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicesComponent } from './services.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
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
