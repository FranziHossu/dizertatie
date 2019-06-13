import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from "@/services/local-storage.service";
import {Router} from "@angular/router";
import {ConfirmationMessage} from "@/components/confirmation/confirmation-message.enum";
import {ConfirmationService} from "@/components/confirmation/confirmation.service";
import {MenuService} from "@/components/menu/menu.service";
import {User} from "@/models";
import {UserService} from "@/services/user.service";
import {SectionTitle} from "@/enums/section-title.enum";

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
  private numberOfNotifications = 0;
  private menuService: MenuService;
  private userService: UserService;

  public user: User = new User();

  constructor(confirmationService: ConfirmationService, userService: UserService, menuService: MenuService, router: Router, localStorageService: LocalStorageService) {
    this.router = router;
    this.confirmationService = confirmationService;
    this.localStorageService = localStorageService;
    this.userService = userService;
    this.menuService = menuService;
  }

  ngOnInit() {
    this.user = this.userService.currentUser;
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

  public navigateTo(target: any) {
    this.router.navigate([target]);

    if (target === 'notifications') {
      this.menuService.changeSection('');
    } else {
      this.menuService.changeSection(SectionTitle.Profile);

    }
  }
}
