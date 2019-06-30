/** It subscribes to the currentUser observable in the authentication service so it can reactively
 show/hide the main navigation bar when the user logs in/out of the application */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService} from '@/components/confirmation/confirmation.service';
import {Subscription} from "rxjs";
import {AlertService} from "@/components/alert/alert.service";
import {ElementsService} from "@/components/popup-elements/elements.service";

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
  private subs: Subscription;

  public displayConfirmation: boolean;
  public displayAlert: boolean;
  public displayElements: boolean;
  public displayUsers: boolean;
  public displayLists: boolean;

  constructor(confirmationService: ConfirmationService, alertService: AlertService, private elementsService: ElementsService) {
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
    this.subs = this.elementsService.elementsDisplayObservable.subscribe((value: number) => {
      if (value) {
        this.displayElements = true;
        if (value === 1) {
          this.displayLists = true;
        } else {
          this.displayUsers = true;
        }
      } else {
        this.displayElements = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.confirmationSubscription.unsubscribe();
    this.alertSubscription.unsubscribe();
    this.subs.unsubscribe();
  }


}
