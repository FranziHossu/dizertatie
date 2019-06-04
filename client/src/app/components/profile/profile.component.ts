import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '@/services/user.service';
import {User} from '@/models';
import {AlertService} from "@/components/alert/alert.service";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private userService: UserService;
  private route: ActivatedRoute;
  private alertService: AlertService;

  public title: string;
  public button: any;
  public listName: any;
  public user: User = new User();
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  private editInfo = false;

  constructor(userService: UserService, route: ActivatedRoute, alertService: AlertService) {
    this.route = route;
    this.alertService = alertService;
    this.userService = userService;
  }

  ngOnInit() {
    this.title = this.route.snapshot.data.section;
    this.user = this.userService.currentUser;
    this.username = this.user.username;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
  }

  public toggleEdit() {
    this.editInfo = !this.editInfo;
  }

  public saveEdit() {
    const user: User = this.userService.currentUser;
    user.lastName = this.lastName;
    user.firstName = this.firstName;
    user.email = this.email;
    user.username = this.username;

    this.userService.updateUser(user).subscribe((data: any) => {
      this.toggleEdit();
    }, () => {
      this.username = this.user.username;
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
    });

  }

  public revertEdit() {
    this.username = this.user.username;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
    this.toggleEdit();
  }

  public changePassword() {
    this.userService.changePassword().subscribe((data: any) => {
      this.alertService.setMessage(`An email has been sent to your email address with a reset link`);
    }, () => {
      this.alertService.setMessage(`Something went wrong. Please try again`);
    });
  }
}

