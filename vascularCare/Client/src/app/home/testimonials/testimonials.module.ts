import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestimonialsComponent } from './testimonials.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
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
