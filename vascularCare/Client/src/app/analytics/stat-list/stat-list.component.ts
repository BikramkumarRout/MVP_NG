import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Table } from 'primeng/table';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';

@Component({
  selector: 'stat-list',
  templateUrl: './stat-list.component.html',
  styleUrls: ['./stat-list.component.css']
})

export class StatListComponent implements OnInit {
  @Input() displayEmit: boolean;
  @Input() facilityId: number;
  @Input() flag: number;
  @Input() date;
  @Input() currentYear;
  @Input() previousMonth;
  @Input() currentMonth;
  @Input() dosCategory: string;
  @Output() displayChange = new EventEmitter();
  public dosData: [];
  dateFilter: any;
  examFilter: any;
  providerFilter: any;
  roomFilter: any;
  first = 0;
  rows = 10;
  searchGlobalText;
  dosHeader: any;
  facilityName;
  dateHeader: any;
  isNoRecorsFound: boolean = false;
  constructor(private dashboardService: DashboardService, private sharedDataService: ShareDataService) { }

  ngOnInit() {
    this.getDosDetails();
    if(this.dosCategory== 'Complete'){
      this.dosHeader= "Completed Appointments";
    }else if(this.dosCategory== 'Consultation'){
      this.dosHeader= "Consultations Performed"
    }else if(this.dosCategory== 'Procedure'){
      this.dosHeader= "Procedures Performed"
    }else if(this.dosCategory== 'Ultrasound'){
      this.dosHeader= "Ultrasounds Performed"
    }else if(this.dosCategory== 'Rescheduled'){
      this.dosHeader= "Rescheduled Appointments"
    }else if(this.dosCategory== 'Cancelled'){
      this.dosHeader= "Cancelled Appointments"
    }
    if(this.flag==0){
      this.dateHeader=this.date;
    }else if(this.flag==1){
      this.dateHeader=this.currentMonth+' '+this.currentYear;
    }else if(this.flag==2){
      this.dateHeader=this.previousMonth+' '+this.currentYear;
    }else if(this.flag==3){
      this.dateHeader='Rolling 1 Year';
    }
    this.onGetFacilityName();
  }

  getDosDetails() {
    this.dashboardService.dosDetail(this.dosCategory, this.date, this.facilityId, this.flag).subscribe(patients => {
      this.dosData = patients.result;
      this.isNoRecorsFound = patients.result.length === 0;
    });
  }

  onClose() {
    this.displayChange.emit(false);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

  public onFilter(event): void {
    this.dateFilter = event.filters.date[0].value;
    this.examFilter = event.filters.exam[0].value;
    this.providerFilter = event.filters.provider[0].value;
    this.roomFilter = event.filters.roomNumber[0].value;
  }

  customSort(event: any) {
    if (event.field == 'date') {
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
          value1 = new Date(value1);
        value2 = new Date(value2);
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        return (event.order * result);
      });
    } else {
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

  clear(table: Table) {
    table.clear();
    this.searchGlobalText = "";
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
    return this.dosData ? this.first === (this.dosData.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.dosData ? this.first === 0 : true;
  }

  onGetFacilityName() {
    this.facilityName = this.sharedDataService.getSelectedFacilityName();;


  }
}
