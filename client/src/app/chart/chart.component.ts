import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartType } from './chart-type.enum';
import { DataService } from '@/services/data.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public chart: any;
  public chartType: any = ChartType.Bar;
  public CHART: any = ChartType;

  private data: Array<any> = new Array<any>();
  private labels: Array<string> = new Array<string>();
  private intervalValue: number = 0;
  private dataService: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  ngOnInit() {
    this.initLabels();
    this.initChart();
    this.getData();
  }

  private getData() {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
      console.log(data);
    }, (error: Error) => {
      console.log('error data', error);
    })
  }

  private initChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets: [
          {
            data: [2, 3, 4, 5],
            borderColor: "#3cba9f",
            fill: false
          },
          {
            data: [2, 5, 4, 5],
            borderColor: "#ffcc00",
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

  }


  public changeChartType() {
    console.log('ce')
    this.chartType = this.chartType;
    this.initChart();
  }

  private initLabels() {
    this.labels = new Array<string>();

    if (!this.intervalValue) {
      for (let i: number = 0; i < 25; i++) {
        this.labels.push(String(i));
      }
    } else {
      if (this.intervalValue < 24) {
        for (let i: number = 0; i < 25; i = i + this.intervalValue) {
          this.labels.push(String(i));
        }
      }
    }
  }

  private getNextDivider() {
    if (!this.intervalValue) return 2;
    for (let i: number = this.intervalValue + 2; i <= 12; i += 2) {
      if (24 % i == 0) {
        console.log(i);
        return i;
      }
    }
    return this.intervalValue;
  }

  private getPreviousDivider() {
    if (this.intervalValue == 2) return 0;
    for (let i: number = this.intervalValue - 2; i >= 0; i -= 2) {
      if (24 % i == 0) {
        console.log(i);
        return i;
      }
    }
    return this.intervalValue;
  }

  public increaseInterval() { this.intervalValue = this.getNextDivider(); this.refreshChart(); }

  public decreaseInterval() { this.intervalValue = this.getPreviousDivider(); this.refreshChart(); }

  private refreshChart() {
    this.initLabels();
    this.initChart();
  }
}
