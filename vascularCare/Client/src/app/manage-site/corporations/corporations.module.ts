import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CorporationsComponent } from './corporations.component';
import { ManageCorporationComponent } from './manage-corporation/manage-corporation.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/user/auth.guard';


@NgModule({
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        // canActivate: [AuthGuard],
        component: CorporationsComponent
      }

    ])
  ],
  declarations: [
    CorporationsComponent,
    ManageCorporationComponent,

  ],
  exports: [
    CorporationsComponent,
    ManageCorporationComponent

  ],
  providers: [],
})
export class CorporationsModule { }
