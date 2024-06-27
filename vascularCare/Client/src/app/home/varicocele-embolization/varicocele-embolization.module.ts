import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactModule } from '../contact/contact.module';
import { VaricoceleEmbolizationComponent } from './varicocele-embolization.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    ContactModule,
    RouterModule.forChild([
      {
        path: 'varicocele-embolization',
        component: VaricoceleEmbolizationComponent

      },
    ]),
  ],
  declarations: [
    VaricoceleEmbolizationComponent

  ],
  exports: [

  ],
  providers: [

  ],

})
export class VaricoceleEmbolizationModule { }
