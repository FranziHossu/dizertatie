import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmailService} from "@/components/mail-sender/email.service";
import {UserService} from "@/services/user.service";

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})
export class EmailsComponent implements OnInit {
  private route: ActivatedRoute;
  private emailService: EmailService;
  private userService: UserService;
  private router: Router;

  public title: any;
  public button: any;
  public list: any;
  public emails: Array<any> = new Array<any>();

  constructor(route: ActivatedRoute, router: Router, emailService: EmailService, userService: UserService) {
    this.route = route;
    this.router = router;
    this.userService = userService;
    this.emailService = emailService;
  }

  ngOnInit() {
    this.title = this.route.snapshot.data.section;

    this.emailService.getUserEmails(this.userService.currentUser.id).subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        const time = new Date(data[i].time);
        const date = time.getDate();
        const month = parseInt(String(time.getMonth())) + 1;
        const year = time.getFullYear();
        const hour = time.getHours();
        const minutes = time.getMinutes();
        data[i].timeAsDate = date + '-' + month + '-' + year;
        data[i].timeAsHours = hour + ':' + minutes;
      }

      this.emails = data;
    }, () => {

    });
  }

  public navigateToEmail(id: any) {
    this.router.navigate([`email/view/${id}`]);
  }
}
