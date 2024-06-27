import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProstaticComponent } from './prostatic.component';
import { HelpFormModule } from 'src/app/home/help-form/help.module';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    HelpFormModule,
    RouterModule.forChild([
      {
        path: 'services/prostatic-artery',
        component: ProstaticComponent
      },
    ]),
  ],
  declarations: [
    ProstaticComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class ProstaticModule { }
