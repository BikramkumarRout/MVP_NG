import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { SpinnerManualModule } from 'src/app/shared/core/common/spinner/spinner-manual.module';
import { PreferencesComponent } from './preferences.component';



@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    SpinnerManualModule,
    RouterModule.forChild([
      {
        path: '',
        component: PreferencesComponent
      }

    ])
  ],
  declarations: [
    PreferencesComponent
  ],
  exports: [
    PreferencesComponent

  ],
  providers: [],
})
export class PreferencesModule { }
