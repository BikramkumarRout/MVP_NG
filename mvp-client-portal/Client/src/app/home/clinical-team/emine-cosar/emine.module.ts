import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmineComponent } from './emine.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'clinical-team/emine-cosar',
        component: EmineComponent
      },
    ]),
  ],
  declarations: [
    EmineComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class EmineModule { }
