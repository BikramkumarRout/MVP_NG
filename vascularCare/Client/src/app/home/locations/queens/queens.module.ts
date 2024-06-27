import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { QueensComponent } from './queens.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'queens',
        component: QueensComponent
      },
    ]),
  ],
  declarations: [
    QueensComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class QueensModule { }
