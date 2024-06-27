import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { IftikharComponent } from './iftikhar.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'clinical-team/iftikhar-ahmad',
        component: IftikharComponent
      },
    ]),
  ],
  declarations: [
    IftikharComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class IftikharModule { }
