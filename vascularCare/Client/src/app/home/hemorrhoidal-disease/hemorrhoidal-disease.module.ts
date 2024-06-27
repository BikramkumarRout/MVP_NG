import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { HemorrhoidalDiseaseComponent } from './hemorrhoidal-disease.component';




@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'hemorrhoidal-disease',
        component: HemorrhoidalDiseaseComponent

      },
    ]),
  ],
  declarations: [
    HemorrhoidalDiseaseComponent

  ],
  exports: [

  ],
  providers: [

  ],

})
export class HemorrhoidalDiseaseModule { }
