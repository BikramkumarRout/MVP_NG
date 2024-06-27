import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestimonialsComponent } from './testimonials.component';
import { HelpFormModule } from 'src/app/home/help-form/help.module';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    HelpFormModule,
    RouterModule.forChild([
      {
        path: 'testimonials',
        component: TestimonialsComponent
      },
    ]),
  ],
  declarations: [
    TestimonialsComponent,
  ],
  exports: [

  ],
  providers: [

  ],

})
export class TestimonialsModule { }
