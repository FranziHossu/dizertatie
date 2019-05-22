/** It subscribes to the currentUser observable in the authentication service so it can reactively
 show/hide the main navigation bar when the user logs in/out of the application */

import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from '@/services/confirmation.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  private confirmationService: ConfirmationService;

  public displayConfirmation: any;

  constructor(confirmationService: ConfirmationService) {
    this.confirmationService = confirmationService;
  }

  ngOnInit(): void {
    this.confirmationService.confirmationObservable.subscribe((value) => {
      this.displayConfirmation = value;
    });
  }

}
