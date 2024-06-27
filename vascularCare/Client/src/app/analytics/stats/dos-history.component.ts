import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { AppConsts } from '../../shared/core/common/app-constant';



@Component({
    templateUrl: './dos-history.component.html',
    selector: 'dos-history',
    styleUrls: ['./dos-history.component.css']
})
export class DosHistoryComponent implements OnInit, OnDestroy {
    @ViewChild('active', { static: false }) tab1: ElementRef;
    @ViewChild('active1', { static: false }) tab2: ElementRef;
    @ViewChild('active2', { static: false }) tab3: ElementRef;
    @ViewChild('active3', { static: false }) tab4: ElementRef;

    @Output() displayEmmiter = new EventEmitter();
    public previousDosData: any = [];
    public facilityId;
    public displayEmit: boolean;
    public dos = AppConsts.message.dosData;
  calledPage = "dos-history";
  chartCalledPage = "analytics-doshistory-chart";
    subscription: any;
    public currentYear;
    public previousMonth;
    public currentMonth;
   requestTab: number;
    private currentMonthNo: number;
    private previousMonthNo: any;
    public DosCategory: any;
    public flag: any;
    public date: string;
    dosData: any;
    isCancelCount: boolean;
    isCompleteCount: boolean;
    isUltrasoundCount: boolean;
    isProcedureCount: boolean;
    isReseduleCount: boolean;
    isConsultation: boolean;
    previousYear: any;


    constructor(private dashboardService: DashboardService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

    ngOnInit() {
        this.subscription = this.dashboardService.notifyObservable$.subscribe((res) => {
            if (res.callBack === this.calledPage) {
                this.facilityId = +res.faclityId;
                this.onGetDashboardData(this.dos);
                this.addAttribute();
            }
        });
        this.onGetDate();
        this.onGetDashboardData(this.dos);

    }

    addAttribute() {
        this.tab1.nativeElement.classList.add('active')
        setTimeout(() => {
            this.tab2.nativeElement.classList.remove('active')
        }, 0);
        setTimeout(() => {
            this.tab3.nativeElement.classList.remove('active')
        }, 0);
        setTimeout(() => {
            this.tab4.nativeElement.classList.remove('active')
        }, 0);
    }

    onGetDate() {
        
        this.currentYear = new Date().getFullYear();
        const date = new Date();
        date.setDate(1)
        date.setMonth(date.getMonth() - 1);
        this.previousMonth = date.toLocaleString('default', { month: 'long' });
        this.previousYear=date.getFullYear();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var d = new Date();
        this.currentMonth = months[d.getMonth()];
        this.currentMonthNo = d.getMonth() + 1;
        this.previousMonthNo = this.currentMonthNo -1;
    }

    onFacilityEmit(facilityId: any) {
        this.facilityId = facilityId;
        this.onGetDashboardData('previousDos');
    }

    onGetDashboardData(event?) {
        if (event == this.dos) {
            this.requestTab = 0;
            // this.tab1.nativeElement.classList.add('active');
            setTimeout(() => {
                this.tab2.nativeElement.classList.remove('active')
            }, 0);
            setTimeout(() => {
                this.tab3.nativeElement.classList.remove('active')
            }, 0);
            setTimeout(() => {
                this.tab4.nativeElement.classList.remove('active')
            }, 0);
       
        } else if (event == this.currentMonth) {
            this.requestTab = 1;
            this.tab2.nativeElement.classList.add('active')
        setTimeout(() => {
            this.tab1.nativeElement.classList.remove('active')
        }, 0);
        setTimeout(() => {
            this.tab3.nativeElement.classList.remove('active')
        }, 0);
        setTimeout(() => {
            this.tab4.nativeElement.classList.remove('active')
        }, 0);
        } else if (event == this.previousMonth) {
            this.requestTab = 2;
            this.tab3.nativeElement.classList.add('active')
        setTimeout(() => {
            this.tab2.nativeElement.classList.remove('active')
        }, 0);
        setTimeout(() => {
            this.tab1.nativeElement.classList.remove('active')
        }, 0);
        setTimeout(() => {
            this.tab4.nativeElement.classList.remove('active')
        }, 0);
        } else if (event == this.currentYear) {
            this.requestTab = 3;
            this.tab4.nativeElement.classList.add('active')
        setTimeout(() => {
            this.tab2.nativeElement.classList.remove('active')
        }, 0);
        setTimeout(() => {
            this.tab3.nativeElement.classList.remove('active')
        }, 0);
        setTimeout(() => {
            this.tab1.nativeElement.classList.remove('active')
        }, 0);
      }

      let dataPass = { requestTab: this.requestTab, callBack: this.chartCalledPage }
      this.dashboardService.pageReloadChart(dataPass);
        this.dashboardService.getDashboards(null, null,
            0, 20, this.facilityId, this.requestTab).subscribe(patients => {
                this.previousDosData = patients.result;
                this.isCancelCount = patients.result.cancelledCount === 0;
                this.isCompleteCount = patients.result.completeCount === 0;
                this.isUltrasoundCount = patients.result.ultrasoundsCount === 0;
                this.isProcedureCount = patients.result.procedureCount === 0;
                this.isReseduleCount = patients.result.rescheduledCount === 0;
                this.isConsultation = patients.result.consultationsCount === 0;
            });
    }

    showDialog(event, count?: any) {
        if (count === 0) {
            this.displayEmit = false;
            return;
        } else {
            this.displayEmit = true;
        }
        if (this.requestTab == 0) {
            this.date = this.previousDosData.previousDosDate;
        } else if (this.requestTab == 1) {
            let today = new Date();
            let dd = '01';
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            this.date = mm + '/' + dd + '/' + yyyy;
        } else if (this.requestTab == 2) {
            let today = new Date();
            let dd = '01';
            let mm = String(today.getMonth()).padStart(2, '0');
            let yyyy = today.getFullYear();
            this.date = mm + '/' + dd + '/' + yyyy;
        } else if (this.requestTab == 3) {
            let today = new Date();
            let dd = '01';
            let mm = '01';
            let yyyy = today.getFullYear();
            this.date = mm + '/' + dd + '/' + yyyy;
        }
        this.DosCategory = event;
        this.flag = this.requestTab;

        let dosObj = {
            DosCategory: event,
            flag: this.requestTab,
            displayEmit: this.displayEmit,
            date: this.date,
            currentMonth: this.currentMonth,
            currentYear: this.currentYear,
            previousMonth: this.previousMonth
        }
        this.displayEmmiter.emit(dosObj);
    }

    onStatDialogClose(event) {
        this.displayEmit = event;
    }

    onActive() {
        this.tab1.nativeElement.classList.add('active')
        setTimeout(() => {
            this.tab2.nativeElement.classList.remove('active')
        }, 0);
        setTimeout(() => {
            this.tab3.nativeElement.classList.remove('active')
        }, 0);
        setTimeout(() => {
            this.tab4.nativeElement.classList.remove('active')
        }, 0);
    }

}
