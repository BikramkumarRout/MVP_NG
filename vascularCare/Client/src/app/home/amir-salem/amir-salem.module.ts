import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AmirSalemComponent } from './amir-salem.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'amir-salem',
        component: AmirSalemComponent
      },
    ]),
  ],
  declarations: [
    AmirSalemComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class AmirSalemModule { }