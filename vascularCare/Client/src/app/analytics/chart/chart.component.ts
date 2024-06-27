import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import { UIChart } from 'primeng/chart';
import {Subscription} from 'rxjs';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

@Component({
  selector: 'analytics-doshistory-chart',
  templateUrl: './chart.component.html',
  providers: [MessageService]
})
export class ChartComponent implements OnInit, OnDestroy {
  //@Input() requestTab: boolean;
  @ViewChild('chart') chart: UIChart; 
  basicData: any;
  multiAxisData: any;
  multiAxisOptions: any;
  lineStylesData: any;
  basicOptions: any;
  stackedData: any;
  stackedData1: any;
  stackedOptions: any;
  subscription: Subscription;
  subscriptionPageRefresh: any;
  calledPage = "dos-history";
  chartCalledPage = "analytics-doshistory-chart";
  subscriptionPageRefresh1: any;
  requestTab = 0;



  constructor(private messageService: MessageService, private dashboardService: DashboardService) { }
  ngOnDestroy(): void {

    if (this.subscriptionPageRefresh) {
      this.subscriptionPageRefresh.unsubscribe();
    }
    if (this.subscriptionPageRefresh1) {
      this.subscriptionPageRefresh1.unsubscribe();
    }
    let lineCharData = {
          labels: null,
          completed: null,
          cancelled: null,
          rescheduled: null

    }
    this.lineChartMap(lineCharData);
  }

  ngOnInit() {
    let test = this.requestTab;
    this.getBarChartData();
    this.subscriptionPageRefresh1 = this.dashboardService.notifyChartObservable$.subscribe((res) => {
      if (res.callBack === this.chartCalledPage) {
        this.requestTab = res.requestTab;
        if (this.requestTab != 3) {
          this.getBarChartData();
        }
        else {
            this.getChartData();
        }
      }
    });
  }


  getChartData() {
    this.dashboardService.getPatientChartData().subscribe(response => {
      this.lineChartMap(response.result);
    });
  }

  getBarChartData() {
    this.dashboardService.getPatientBarChartData(this.requestTab).subscribe(response => {
      this.barChartDataMap(response.result);
    });
  }
  barChartDataMap(result: any) {
  
    this.stackedData = {
      labels: result.lables,
      datasets: [{
        type: 'bar',
        label: 'Consultations',
        backgroundColor: '#60c39b',
        data: result.consultation
      }, {
        type: 'bar',
        label: 'Procedures',
        backgroundColor: '#a3dcc5',
        data: result.procedure
      }, {
        type: 'bar',
        label: 'Ultrasounds',
        backgroundColor: '#c8eadc',
        data: result.ultrasound
      },

      {
        type: 'bar',
        label: 'Rescheduled',
        backgroundColor: '#e1be5f',
        data: result.rescheduled
      },
      {
        type: 'bar',
        label: 'Cancelled',
        backgroundColor: '#c7473f',
        data: result.cancelled
      }

      ]
    };



    this.stackedOptions = {
      tooltips: {
        mode: 'index',
        intersect: false
      },
      legend: {
        position: 'bottom'
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true,

        },

        ]
      },

    };

  }

  lineChartMap(result: any) {
    // let labels = result.lables.toString()
    
    this.basicData = {
      labels: result.lables,
      datasets: [
        {
          label: 'Completed',
          data: result.completed,
          fill: false,
          borderColor: '#2E8B57',
          tension: 0
        },
        {
          label: 'Canceled',
          data: result.cancelled,
          fill: false,
          borderColor: '#c7473f',
          tension: 0
        },
        {
          label: 'Rescheduled',
          data: result.rescheduled,
          fill: false,
          borderColor: '#e1be5f',
          tension: 0
        }
      ]
    };
    this.applyLightTheme();



  }

  applyLightTheme() {
    this.basicOptions = {
      legend: {
        position: 'bottom'
      },
      plugins: {
        legend: {
          position: 'bottom'

        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }

        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          },

        }
      },


    };

  }
}


