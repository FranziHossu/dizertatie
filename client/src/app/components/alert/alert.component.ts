/** passes alert messages to the template whenever a message is received from the alert service */

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {AlertService} from '@/components/alert/alert.service';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.scss']
})

export class AlertComponent implements OnInit, OnDestroy {
  private alertService: AlertService;

  public message: any;

  constructor(alertService: AlertService) {
    this.alertService = alertService;
  }

  ngOnInit() {
    this.message = this.alertService.message;
  }

  ngOnDestroy() {
  }

  public close() {
    this.alertService.setMessage(null);
  }

}
