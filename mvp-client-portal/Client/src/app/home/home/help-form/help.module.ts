import { NgModule } from '@angular/core';
//import { RouterModule } from '@angular/router';
//import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { HelpFormComponent } from './help.component';
 
 
@NgModule({
  imports: [
    SharedModule.forRoot(),
      
  ],
  declarations: [
    // HelpFormComponent,
    ],
  exports: [
    // HelpFormComponent,
  ],
  providers: [

  ],

})
export class HelpFormModule { }
