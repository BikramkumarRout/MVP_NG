import { Component, Input, OnInit, OnChanges, QueryList, ViewChild, ViewChildren, Output, EventEmitter } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { MultiSelect } from 'primeng/multiselect';
import { Table } from 'primeng/table';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { PaginationService } from 'src/app/shared/pagination/pagination.service';
import { PrimengTableHelper } from 'src/app/shared/pagination/PrimengTableHelper';
import { ProfileService } from '../profile.service';
import { AppointmentHistoryPaging } from './appointment-history';
import { AppointmentHistory } from './appointmentHistory';
import { saveAs } from 'file-saver';


@Component({
  selector: 'profile-appointment-history',
  templateUrl: './appointment-hisotry.component.html',
  styleUrls: ['./appointment-hisotry.component.css']

})
export class AppointmentHistoryComponent implements OnInit {
  first = 0;
  rows = 10;
  @ViewChild('dt1') table: Table;
  @Input() patientHistory: AppointmentHistory[] = [];
  @Input() patientId: number;
  @Input() facilityId: number;
  nameFilter: any;
  dateFilter: any;
  examFilter: any;
  providerFilter: any;
  roomFilter: any;
  idFilter: any;
  statusFilter: any;
  searchGlobalText;
  isNoRecorsFound: boolean = false;
  reuestTypes: string;
  sortingType: any;
  sorting: string;

  constructor(private commonService: CommonService) {

  }
  ngOnInit(): void {
    this.isNoRecorsFound = this.patientHistory.length === 0;
    this.reuestTypes = "Appointment History";    
  }
  
  onExport() {
    this.sorting = this.table.sortField;
    if(this.table.sortOrder = 1){
      this.sortingType === "Asc";
    }else{
      this.sortingType === "Dsc";
    }
    this.commonService.downloadExcel(this.facilityId,this.sorting,this.sortingType,this.reuestTypes,this.patientId).subscribe(res =>{
      saveAs(res, this.reuestTypes + ".xlsx");
    });
  }
  

  next() {
    this.first = this.first + this.rows;
  }

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.patientHistory ? this.first === (this.patientHistory.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.patientHistory ? this.first === 0 : true;
  }
  clear(table: Table) {
    table.clear();
    this.searchGlobalText = "";

}

public onFilter(event): void {
  this.dateFilter=event.filters.date[0].value;
  this.examFilter=event.filters.exam[0].value;
  this.providerFilter=event.filters.provider[0].value;
  this.roomFilter=event.filters.roomNumber[0].value;
  this.statusFilter=event.filters.status[0].value;
  }

  customSort(event: any) {
    if(event.field == 'date'){

    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
          result = -1;
      else if (value1 != null && value2 == null)
          result = 1;
      else if (value1 == null && value2 == null)
          result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
      value1= new Date(value1);
      value2= new Date(value2);
      result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;


      return (event.order * result);
  });
    }else {
      event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });

  }

    }


  }





