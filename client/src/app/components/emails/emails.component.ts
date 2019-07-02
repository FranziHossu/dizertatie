import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { EmailService } from "@/components/mail-sender/email.service";
import { UserService } from "@/services/user.service";
import { ConfirmationService } from "@/components/confirmation/confirmation.service";
import { ConfirmationMessage } from "@/components/confirmation/confirmation-message.enum";
import { AlertService } from "@/components/alert/alert.service";
import { Email } from '../mail-sender/mail.model';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})
export class EmailsComponent implements OnInit {
  private route: ActivatedRoute;
  private emailService: EmailService;
  private userService: UserService;
  private confirmationService: ConfirmationService;
  private router: Router;
  private alertService: AlertService;

  public title: any;
  public button: any;
  public list: any;
  public emails: Array<any> = new Array<any>();

  constructor(route: ActivatedRoute, alertService: AlertService, confirmationService: ConfirmationService, router: Router, emailService: EmailService, userService: UserService) {
    this.confirmationService = confirmationService;
    this.route = route;
    this.router = router;
    this.userService = userService;
    this.emailService = emailService;
    this.alertService = alertService;
  }

  ngOnInit() {

    this.title = this.route.snapshot.data.section;

    this.emailService.getUserEmails(this.userService.currentUser.id).subscribe((data: Array<Email>) => {
      for (let i = 0; i < data.length; i++) {
        const time = new Date(data[i].time);
        const date = time.getDate();
        const month = parseInt(String(time.getMonth())) + 1;
        const year = time.getFullYear();
        const hour = time.getHours();
        let minutes:string = String(time.getMinutes());

        if(Number(minutes) < 10){
          minutes = String('0' + minutes);
        }

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
      this.emails = data;
    }, () => {

    });
  }

  public navigateToEmail(id: any) {
    this.router.navigate([`email/view/${id}`]);
  }

  public deleteEmail(email: any) {
    this.confirmationService.setMessage(ConfirmationMessage.DELETE_EMAIL);
    const subs = this.confirmationService.answerObservable.subscribe((answer: any) => {
      if (answer) {
        this.alertService.setMessage(`Email successfully deleted`);

        this.emailService.deleteEmail(email).subscribe((data: any) => {
          for (let i = 0; i < this.emails.length; i++) {
            if (this.emails[i].id === email.id) {
              this.emails.splice(i, 1);
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
}
