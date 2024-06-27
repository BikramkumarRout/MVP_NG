import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactModule } from '../contact/contact.module';
import { UterineFibroidsComponent } from './uterine-fibroids.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    ContactModule,
    RouterModule.forChild([
      {
        path: 'uterine-fibroids',
        component: UterineFibroidsComponent

      },
    ]),
  ],
  declarations: [
    UterineFibroidsComponent

  ],
  exports: [

  ],
  providers: [

  ],

})
export class UterineFibroidsModule { }
