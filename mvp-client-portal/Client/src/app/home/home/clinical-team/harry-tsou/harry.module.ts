import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { HarryComponent } from './harry.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'clinical-team/harry-tsou',
        component: HarryComponent
      },
    ]),
  ],
  declarations: [
    HarryComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class HarryModule { }
