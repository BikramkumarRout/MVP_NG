import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ISpinnerState {
  show: boolean;
}

@Injectable()
export class SpinnerService {
  private spinnerSubject = new Subject<ISpinnerState>();

  spinnerState = <Observable<ISpinnerState>>this.spinnerSubject;

  show() {
    this.spinnerSubject.next(<ISpinnerState>{ show: true });
  }

  hide() {
    this.spinnerSubject.next(<ISpinnerState>{ show: false });
  }
}