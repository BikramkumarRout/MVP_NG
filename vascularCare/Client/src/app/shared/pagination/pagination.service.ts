import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PrimengTableHelper } from './PrimengTableHelper';
const pagesShow: number = 3;

@Injectable({
  providedIn: 'root'
})

export class PaginationService {
  public startValue: number = 0;
  public lastValue: number = 20;
  primengTableHelper = PrimengTableHelper;

  public setPageNumbers(primengTableHelper: PrimengTableHelper) {
    let startValue = primengTableHelper.page === 1 ? primengTableHelper.page :
    (primengTableHelper.page * primengTableHelper.defaultRecordsCountPerPage - primengTableHelper.defaultRecordsCountPerPage);
    let lastValue = primengTableHelper.defaultRecordsCountPerPage * primengTableHelper.page;
    lastValue = lastValue > primengTableHelper.totalRecordsCount ? primengTableHelper.totalRecordsCount : lastValue;
    return {startValue: startValue, lastValue: lastValue}
  }

  public setPageNumberStartValue(primengTableHelper:PrimengTableHelper) {
    // let startValue = this.primengTableHelper.page === 1 ? this.primengTableHelper.page :
    // (this.primengTableHelper.page * this.primengTableHelper.defaultRecordsCountPerPage - this.primengTableHelper.defaultRecordsCountPerPage);
  }

  public setPageNumberlastValue(primengTableHelper:PrimengTableHelper) {
    // let lastValue = this.primengTableHelper.defaultRecordsCountPerPage * this.primengTableHelper.page;
    // this.lastValue = this.lastValue > this.primengTableHelper.totalRecordsCount ? this.primengTableHelper.totalRecordsCount : this.lastValue;
  }


  // constructor(private http: HttpClient) {
  //   this.primengTableHelper = new PrimengTableHelper();
  //   this.limit = this.primengTableHelper.defaultRecordsCountPerPage;
  // }

  // setPage(page: number) {
  //   this.pageChanged.next({
  //     page: page,
  //     limit: this.limit,
  //     skipCount: page
  //   });
  // }

  // getPage(page: number) {
  //   this.list = []
  //   this.primengTableHelper.page = page;
  //   this.setPageNumbers();
  // }

  // handlePaginationEvent(event) {
  //   this.getPage(event.page);
  // }

  // onPageChanged(event: any) {

  // }

  // onSetItemsPerPage(recordsPerPage: any) {
  //   this.primengTableHelper.defaultRecordsCountPerPage = recordsPerPage;
  //   this.limit = recordsPerPage;
  //   this.primengTableHelper.page = 1;
  //   setPageNumbers();
  //   //this.setPage(this.primengTableHelper.page);
  // }

  // public setPageNumbers() {
  //   this.startValue = this.primengTableHelper.page === 1 ? 0 :
  //   (this.primengTableHelper.page * this.primengTableHelper.defaultRecordsCountPerPage -
  //   this.primengTableHelper.defaultRecordsCountPerPage);
  //   this.lastValue = this.primengTableHelper.defaultRecordsCountPerPage * this.primengTableHelper.page;
  //   this.lastValue = this.lastValue > this.primengTableHelper.totalRecordsCount ? this.primengTableHelper.totalRecordsCount
  //   : this.lastValue;
  // }

}
