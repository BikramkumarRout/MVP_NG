import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DanielStokComponent } from './daniel-stok.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'daniel-stok',
        component: DanielStokComponent
      },
    ]),
  ],
  declarations: [
    DanielStokComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class DanielStockModule { }
