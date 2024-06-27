import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SpinnerManualComponent } from "./spinner-manual.component";


@NgModule({

  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SpinnerManualComponent
  ],
  exports: [
    SpinnerManualComponent
  ],

})
export class SpinnerManualModule { }
