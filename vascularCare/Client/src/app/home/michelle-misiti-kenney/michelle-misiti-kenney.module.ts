import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MichelleMisitiKenneyComponent } from './michelle-misiti-kenney.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'michelle-misiti-kenney',
        component: MichelleMisitiKenneyComponent
      },
    ]),
  ],
  declarations: [
    MichelleMisitiKenneyComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class MichelleMisitiKenneyModule { }
