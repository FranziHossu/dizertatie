import {Component, OnInit} from "@angular/core";
import {UserService} from "@/services/user.service";
import {SectionTitle} from '@/enums/section-title.enum';
import {UserNotification} from '@/models/notification';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  private userService: UserService;
  private notifications: any;
  public title = SectionTitle.Notifications;
  button: any;
  listName: any;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.userService.getUserNotifications().subscribe((data: any) => {
      this.notifications = this.convert(data);
      console.log(data);
    }, (error: any) => {

    });

  }

  private convert(data: Array<any>) {
    data.forEach((e: UserNotification) => {
      e.time = new Date(e.time);
      e.timeAsDate = e.time.getDate() + '-' + String(Number(e.time.getMonth()) + 1) + '-' + e.time.getFullYear();
      e.hour = e.time.getHours() + ':' + e.time.getMinutes();
    });

    return data;
  }
}
