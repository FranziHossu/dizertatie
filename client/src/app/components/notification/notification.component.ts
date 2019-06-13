import {Component, OnInit} from "@angular/core";
import {UserService} from "@/services/user.service";

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  private userService: UserService;
  private notifications: any;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.userService.getUserNotifications().subscribe((data: any) => {
      this.notifications = data;
      console.log(data);
    }, (error: any) => {

    });

  }

}
