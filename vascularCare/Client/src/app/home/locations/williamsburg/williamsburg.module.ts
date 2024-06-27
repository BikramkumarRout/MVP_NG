import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { WilliamsburgComponent } from './williamsburg.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'williamsburg',
        component: WilliamsburgComponent
      },
    ]),
  ],
  declarations: [
    WilliamsburgComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class WilliamsburgModule { }
