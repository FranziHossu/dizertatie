/** It subscribes to the currentUser observable in the authentication service so it can reactively
 show/hide the main navigation bar when the user logs in/out of the application */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService} from '@/components/confirmation/confirmation.service';
import {Subscription} from "rxjs";
import {AlertService} from "@/components/alert/alert.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  private confirmationService: ConfirmationService;
  private confirmationSubscription: Subscription;
  private alertService: AlertService;
  private alertSubscription: Subscription;

  public displayConfirmation: boolean;
  public displayAlert: boolean;

  constructor(confirmationService: ConfirmationService, alertService: AlertService) {
    this.confirmationService = confirmationService;
    this.alertService = alertService;
  }

  ngOnInit(): void {
    this.confirmationSubscription = this.confirmationService.confirmationObservable.subscribe((value: boolean) => {
      this.displayConfirmation = value;
    });
    this.alertSubscription = this.alertService.alertObservable.subscribe((value: boolean) => {
      this.displayAlert = value;
    });
  }

  ngOnDestroy(): void {
    this.confirmationSubscription.unsubscribe();
    this.alertSubscription.unsubscribe();
  }


}
