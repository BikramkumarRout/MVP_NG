import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { VaricoceleComponent } from './varicocele.component';
import { HelpFormModule } from 'src/app/home/help-form/help.module';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    HelpFormModule,
    RouterModule.forChild([
      {
        path: 'services/varicocele-embolization',
        component: VaricoceleComponent
      },
    ]),
  ],
  declarations: [
    VaricoceleComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class VaricoceleModule { }
