import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommackComponent } from './commack.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'commack',
        component: CommackComponent
      },
    ]),
  ],
  declarations: [
    CommackComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class CommackModule { }
