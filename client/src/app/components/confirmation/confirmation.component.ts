import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from '@/components/confirmation/confirmation.service';

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
    this.message = this.confirmationService.message;
  }

  public confirm() {
    this.confirmationService.nextConfirmation(false);
    this.confirmationService.nextAnswer(true);
  }

  public reject() {
    this.confirmationService.nextConfirmation(false);
    this.confirmationService.nextAnswer(false);
  }
}
