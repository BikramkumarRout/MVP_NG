import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MvpPaginationComponent} from './mvp-pagination.component';
import { FormsModule } from '@angular/forms';

export * from './mvp-pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
      MvpPaginationComponent
  ],
  exports: [
    MvpPaginationComponent,
    CommonModule,
    FormsModule
  ]
})
export class MvpPaginationModule {
  static forRoot() {
    return {
      ngModule: MvpPaginationModule
    };
  }
}
