import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolesComponent } from './roles.component';
import { CreateEDitRoleComponent } from './create-edit-role.component';
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
        component: RolesComponent
      }

    ])
  ],
  declarations: [
    RolesComponent,
    CreateEDitRoleComponent
  ],
  exports: [
    RolesComponent,
    CreateEDitRoleComponent
  ],
  providers: [],
})
export class RoleModule { }
