import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EliezerHalpertComponent } from './eliezer-halpert.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'eliezer-halpert',
        component: EliezerHalpertComponent

      },
    ]),
  ],
  declarations: [
    EliezerHalpertComponent

  ],
  exports: [

  ],
  providers: [

  ],

})
export class EliezerHalpertModule { }
