import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrooklynComponent } from './brooklyn.commponent';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'brooklyn',
        component: BrooklynComponent
      },
    ]),
  ],
  declarations: [
    BrooklynComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class BrooklynModule { }
