import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { VericoseComponent } from './vericose.component';
import { HelpFormModule } from 'src/app/home/help-form/help.module';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    HelpFormModule,
    RouterModule.forChild([
      {
        path: 'services/vericose-veins',
        component: VericoseComponent
      },
    ]),
  ],
  declarations: [
    VericoseComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class VericoseModule { }
