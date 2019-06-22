import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "@/services/user.service";
import {User} from "@/models";
import {AlertService} from "@/components/alert/alert.service";


@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  private route: ActivatedRoute;
  private token: string;
  private userService: UserService;
  private invalidToken = false;
  private user: User;
  private alertService: AlertService;
  private router: Router;

  public password = '';
  public confirmedPassword = '';
  public section: number;
  public confirmedToken: any;

  constructor(alertService: AlertService, route: ActivatedRoute, userService: UserService, router: Router) {
    this.route = route;
    this.router = router;
    this.alertService = alertService;
    this.userService = userService;
  }

  ngOnInit(): void {
    this.section = this.route.snapshot.data.section;
    this.token = this.route.snapshot.params.token;

    if (this.section === 0) {
      this.userService.getUserByPasswordToken(this.token).subscribe((data: any) => {
        if (!data) {
          this.invalidToken = true;
        } else {
          this.user = data;
        }
      }, (error: any) => {
        this.invalidToken = true;
      });
    } else {
      this.userService.getAccountToken(this.token).subscribe((data: any) => {
        if (!data) {
          this.invalidToken = true;
        } else {
          this.user = data;
          this.confirmAccount();
        }
      }, (error: any) => {
        this.invalidToken = true;
      });
    }
  }

  public confirmPassword(): void {
    if (!this.password || this.password === '' || this.confirmedPassword === ''
      || !this.confirmedPassword || this.confirmedPassword !== this.password) {
      this.alertService.setMessage(`Passwords cannot be empty and they should match`);
    } else {
      this.user.password = this.password;
      this.userService.updateUserPassword(this.user).subscribe((data: any) => {
          this.alertService.setMessage(`Password has been successfully changed`);
          this.router.navigate(['login']);
        },
        () => {
          this.alertService.setMessage(`Something went wrong, please try again`);
        });
    }
  }

  public confirmAccount() {
    this.userService.confirmAccount(this.token).subscribe((data: any) => {
      this.confirmedToken = true;
    }, (error: any) => {
      this.confirmedToken = false;
    });
  }

  public navigateToLogin(){
    this.router.navigate(['login'])
  }
}
