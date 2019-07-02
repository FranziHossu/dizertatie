import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartType } from './chart-type.enum';
import { DataService } from '@/services/data.service';
import { UserService } from '@/services/user.service';
import { EmailService } from '../mail-sender/email.service';
//import { randomFill } from 'crypto';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public chart: any;
  public chartType: any = ChartType.Bar;
  public CHART: any = ChartType;

  public emailsPerMonth = [0,0,0,0,0,0,0,0,1,0,0,0, 0];

  private data: Array<any> = new Array<any>();
  private labels: Array<string> = new Array<string>();
  private intervalValue: number = 0;
  private dataService: DataService;
  public userEmails: Array<any> = new Array<any>();
  constructor(dataService: DataService, private emailService: EmailService, private userService: UserService) {
    this.dataService = dataService;
  }

  ngOnInit() {
    this.initLabels();
    this.initChart();
    this.getUserEmails();
  }

  private getUserEmails() {
    const subs = this.emailService.getUserEmails(this.userService.currentUser.id).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        const time = new Date(data[i].time);
        const date = time.getDate();
        const month = parseInt(String(time.getMonth())) + 1;
        const year = time.getFullYear();
        const hour = time.getHours();
        const minutes = time.getMinutes();
        let toStringText = '';

        for (let index = 0; index < data[i].to.length; index++) {
          if (toStringText != '') {
            toStringText += ', ' + data[i].to[index];
          } else {
            toStringText += data[i].to[index];
          }
        }

        for (let index = 0; index < data[i].toLists.length; index++) {
          if (toStringText != '') {
            toStringText += ', ' + data[i].toLists[index].name;
          } else {
            toStringText += ', ' + data[i].toLists[index].name;
          }
        }

        data[i].timeAsDate = date + '-' + month + '-' + year;
        data[i].timeAsHours = hour + ':' + minutes;
        data[i].toString = toStringText;

      }

      let arr = [];

      for (let index = 0; index < 12; index++) {
        let counter = 0;
        for (let i = 0; i < data.length; i++) {
          if (Number(data[i].timeAsDate.split('-')[1]) === (index + 1)) {
            counter++
          }
        }
        arr.push(counter);
      }
      arr.push(0);
      this.userEmails = arr;

      console.log(this.userEmails);
      subs.unsubscribe();

      this.refreshChart();
    }, (error: Error) => {
      subs.unsubscribe();
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
            data: this.userEmails,
            backgroundColor: ['blue','yellow','green','pink','orange','lila'],
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
    this.initChart();
  }

  private initLabels() {
    this.labels = new Array<string>();

    if (!this.intervalValue) {
      for (let i: number = 1; i < 13; i++) {
        this.labels.push(String(i));
      }
    } else {
      if (this.intervalValue < 12) {
        for (let i: number = 1; i < 13; i = i + this.intervalValue) {
          this.labels.push(String(i));
        }
      }
    }
  }

  private getNextDivider() {
    if (!this.intervalValue) return 2;
    for (let i: number = this.intervalValue + 2; i <= 12; i += 2) {
      if (24 % i == 0) {
        return i;
      }
    }
    return this.intervalValue;
  }

  private getPreviousDivider() {
    if (this.intervalValue == 2) return 0;
    for (let i: number = this.intervalValue - 2; i >= 0; i -= 2) {
      if (24 % i == 0) {
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
