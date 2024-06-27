import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { ISpinnerState, SpinnerService } from './spinner.service';

const ACTIVE_CLASS = 'is-active';

@Component({
  selector: 'app-spinner-manual',
  templateUrl: './spinner-manual.component.html',
  styleUrls: ['./spinner.component.css']
})

export class SpinnerManualComponent implements OnDestroy, OnInit {
  @Input() isSpinnerVisible : boolean;
  private spinnerStateChanged: Subscription;
  constructor(private spinnerService: SpinnerService) { }
  ngOnInit() {

  }
  ngOnDestroy() {
    this.isSpinnerVisible = false;
  }
}
