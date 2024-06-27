import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { UterineComponent } from './uterine.component';
import { HelpFormModule } from 'src/app/home/help-form/help.module';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    HelpFormModule,
    RouterModule.forChild([
      {
        path: 'services/uterine-fibroids-disease',
        component: UterineComponent
      },
    ]),
  ],
  declarations: [
    UterineComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class UterineModule { }
