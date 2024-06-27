import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { EssexComponent } from './essex.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'essex',
        component: EssexComponent
      },
    ]),
  ],
  declarations: [
    EssexComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class EssexModule { }
