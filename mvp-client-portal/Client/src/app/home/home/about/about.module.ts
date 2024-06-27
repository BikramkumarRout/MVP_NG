import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutComponent } from './about.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'about',
        component: AboutComponent
      },
    ]),
  ],
  declarations: [
    AboutComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class AboutModule { }
