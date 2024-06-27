import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageUserDetailComponent } from './manage-user-detail.component';
import { ManageUserComponent } from './manage-user.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManageUserComponent
      }

    ])
  ],
  declarations: [
    ManageUserComponent,
    ManageUserDetailComponent

  ],
  exports: [
    ManageUserComponent,
    ManageUserDetailComponent
  ],
  providers: [],
})
export class ManageUserModule { }
