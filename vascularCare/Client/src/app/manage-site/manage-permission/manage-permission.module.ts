import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PermissionComponent } from './manage-permission.component';
import { CreateEditPermissionComponent } from './create-edit-permission.component';
import { RouterModule } from '@angular/router';
import { NotificationService } from 'src/app/shared/core/common/notification';



@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PermissionComponent
      }

    ])
  ],
  declarations: [
    PermissionComponent,
    CreateEditPermissionComponent
  ],
  exports: [
    PermissionComponent,
    CreateEditPermissionComponent
  ],
  providers: [],
})
export class ManagePermissionModule { }
