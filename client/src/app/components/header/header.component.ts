import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from "@/services/local-storage.service";
import {Router} from "@angular/router";
import {ConfirmationMessage} from "@/components/confirmation/confirmation-message.enum";
import {ConfirmationService} from "@/components/confirmation/confirmation.service";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() logoutStatus: boolean;

  private localStorageService: LocalStorageService;
  private router: Router;
  private confirmationService: ConfirmationService;

  constructor(confirmationService: ConfirmationService, router: Router, localStorageService: LocalStorageService) {
    this.router = router;
    this.confirmationService = confirmationService;
    this.localStorageService = localStorageService;
  }

  ngOnInit() {
  }

  public logout() {
    this.confirmationService.setMessage(ConfirmationMessage.LOGOUT);
    this.confirmationService.answerObservable.subscribe((answer: any) => {
      if (answer) {
        this.localStorageService.clear();
        this.router.navigate(['login']);
      }
    });

  }
}
