import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting.routing.module';
import { SettingComponent } from './setting.component';
import { SettingService } from './setting.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    SettingRoutingModule,
    ReactiveFormsModule
   
  ],
  declarations: [
    SettingComponent,
    ResetPasswordComponent
  ],
  exports: [
  ],
  providers: [SettingService],
})
export class SettingModule { }
