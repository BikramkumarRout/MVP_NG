import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { EliezerComponent } from './eliezer.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'clinical-team/eliezer-halpert',
        component: EliezerComponent
      },
    ]),
  ],
  declarations: [
    EliezerComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class EliezerModule { }
