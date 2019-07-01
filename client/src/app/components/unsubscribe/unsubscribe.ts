import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "@/services/user.service";
import {User} from "@/models";
import {AlertService} from "@/components/alert/alert.service";
import {ListService} from "@/components/lists/list.service";


@Component({
  selector: 'unsubscribe',
  templateUrl: './unsubscribe.html',
  styleUrls: ['./unsubscribe.scss'],
})
export class UnsubscribeComponent implements OnInit {
  private route: ActivatedRoute;
  private item: string;
  private splited: any;
  private userService: UserService;
  private invalidToken = false;
  private user: User;
  private alertService: AlertService;
  private router: Router;


  constructor(alertService: AlertService, route: ActivatedRoute, userService: UserService, router: Router, private listService: ListService) {
    this.route = route;
    this.router = router;
    this.alertService = alertService;
    this.userService = userService;
  }

  ngOnInit(): void {
    this.item = this.route.snapshot.params.item;

    this.splited = this.item.split('-');

    if (this.splited.length !== 2) {
      this.invalidToken = true;
    } else {

      this.listService.getListById(this.splited[0]).subscribe((data) => {
          console.log(data);
      });

    }

  }

  public navigateToLogin() {
    this.router.navigate(['login']);
  }
}
