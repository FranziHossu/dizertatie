import { Component } from "@angular/core";
import { UserService } from "@/services/user.service";
import { User } from "@/models";
import { ConfirmationMessage } from "../confirmation/confirmation-message.enum";
import { ConfirmationService } from "../confirmation/confirmation.service";
import { AlertService } from "../alert/alert.service";
import { EmailService } from "../mail-sender/email.service";
import { Router } from "@angular/router";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public userService: UserService;
  public alertService: AlertService;
  public router: Router;
  public emailService: EmailService;
  public confirmationService: ConfirmationService;

  public users: Array<User> = new Array<User>();

  constructor(userService: UserService, router: Router, confirmationService: ConfirmationService, emailService: EmailService, alertService: AlertService) {
    this.userService = userService;
    this.confirmationService = confirmationService;
    this.router = router;
    this.alertService = alertService;
    this.emailService = emailService;
  }

  ngOnInit() {
    const subs = this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
      subs.unsubscribe();
    }, () => {
      subs.unsubscribe();
    })
  }

  public deleteUser(user: any) {
    this.confirmationService.setMessage(ConfirmationMessage.DELETE_USER);
    const subs = this.confirmationService.answerObservable.subscribe((answer: any) => {
      if (answer) {
        this.alertService.setMessage(`User succsessfully deleted`);

        this.userService.deleteUser(user.id).subscribe((data: any) => {
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === user.id) {
              this.users.splice(i, 1);
              break;
            }
          }
        }, (error: any) => {
          this.alertService.setMessage(`Something went wrong. Please try again`);
        });
      }
      subs.unsubscribe();
    });
  }

  public navigateToUser(user: any) {
    this.router.navigate([`user/${user.id}`]);
  }
}
