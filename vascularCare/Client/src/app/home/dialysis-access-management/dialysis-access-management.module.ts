import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactModule } from '../contact/contact.module';
import { DialysisAccessManagementComponent } from './dialysis-access-management.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    ContactModule,
    RouterModule.forChild([
      {
        path: 'dialysis-access-management',
        component: DialysisAccessManagementComponent
      },
    ]),
  ],
  declarations: [
    DialysisAccessManagementComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class DialysisModule { }
