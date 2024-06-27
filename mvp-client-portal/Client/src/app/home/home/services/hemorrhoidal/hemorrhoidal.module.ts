import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { HemorrhoidalComponent } from './hemorrhoidal.component';
import { HelpFormModule } from 'src/app/home/help-form/help.module';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    HelpFormModule,
    RouterModule.forChild([
      {
        path: 'services/hemorrhoidal-disease',
        component: HemorrhoidalComponent
      },
    ]),
  ],
  declarations: [
    HemorrhoidalComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class HemorrhoidalModule { }
