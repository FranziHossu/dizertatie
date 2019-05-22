import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "@/services/confirmation.service";

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  private confirmationService: ConfirmationService;

  public message: any;

  constructor(confirmationService: ConfirmationService) {
    this.confirmationService = confirmationService;
  }

  ngOnInit() {
  }

  confirm() {
    this.confirmationService.next(true);
  }

  reject() {
      this.confirmationService.next(false);
  }
}
