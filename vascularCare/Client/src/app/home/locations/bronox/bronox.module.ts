import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { BronoxComponent } from './bronox.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'bronox',
        component: BronoxComponent
      },
    ]),
  ],
  declarations: [
    BronoxComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class BronoxModule { }
