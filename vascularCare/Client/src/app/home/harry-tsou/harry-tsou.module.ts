import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HarryTsouComponent } from './harry-tsou.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'harry-tsou',
        component: HarryTsouComponent
      },
    ]),
  ],
  declarations: [
    HarryTsouComponent
  ],
  exports: [

  ],
  providers: [

  ],

})
export class HarryTsouModule { }
