import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { WestchesterComponent } from './westchester.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'westchester',
        component: WestchesterComponent
      },
    ]),
  ],
  declarations: [
    WestchesterComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class WestchesterModule { }
