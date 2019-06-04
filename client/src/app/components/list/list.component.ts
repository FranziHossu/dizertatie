import {Component, OnInit} from '@angular/core';
import {List} from '../lists/list.model';
import {UserService} from '@/services/user.service';
import {ListService} from '@/components/lists/list.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from "@/components/alert/alert.service";
import {AlertMessage} from "@/components/alert/alert-message";
import {SectionTitle} from "@/enums/section-title.enum";

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private userService: UserService;
  private listService: ListService;
  private router: Router;
  private route: ActivatedRoute;
  private alertService: AlertService;

  public list: List = new List();
  public allEmails: Array<string> = new Array();
  public email: string;
  public title: string;
  public listName: string;
  public button: string;
  public showAddButton: any;
  public nameError = false;
  public emailsListError = false;
  public sectionTitle = SectionTitle;

  constructor(userService: UserService, listService: ListService, router: Router, route: ActivatedRoute, alertService: AlertService) {
    this.alertService = alertService;
    this.userService = userService;
    this.listService = listService;
    this.route = route;
    this.router = router;
  }

  ngOnInit() {
    this.title = this.route.snapshot.data.section;

    if (this.title === this.sectionTitle.UpdateList) {
      this.listService.getListById(this.route.snapshot.params.id).subscribe((data: any) => {
        this.list = data;
        this.listName = this.list.name;
      }, (error: any) => {

      });
    }
  }

  public addEmailToList() {
    if (!this.email) {
      return;
    }
    for (let i = 0; i < this.list.emails.length; i++) {
      if (this.list.emails[i] === this.email) {
        this.email = '';
        return;
      }
    }
    this.list.emails.push(this.email);
    this.email = '';
  }

  public removeEmailFromList(email: string) {
    for (let i = 0; i < this.list.emails.length; i++) {
      if (this.list.emails[i] === email) {
        this.list.emails.splice(i, 1);
        return;
      }
    }
  }

  public saveList() {
    if (this.verify()) {
      this.list.user = this.userService.currentUser.id;
      this.listService.addList(this.list).subscribe(() => {
        this.router.navigate(['lists']);
      }, () => {

      });
    }
  }

  public updateList() {
    if (this.verify()) {
      console.log('update the list');
      this.listService.updateList(this.list).subscribe(() => {
        this.router.navigate(['lists']);
      }, () => {

      });
    }
  }

  public toggleShowAddButton() {
    this.showAddButton = !this.showAddButton;
  }

  private verify() {
    if (!this.list.name || this.list.name === '' || !this.list.emails.length) {
      this.alertService.setMessage(AlertMessage.CreateListError);

      if (!this.list.name || this.list.name === '') {
        this.nameError = true;
      }

      if (!this.list.emails.length) {
        this.emailsListError = true;
      }

      return false;
    }
    return true;
  }

  public toggleErrorName() {
    this.nameError = false;
  }

  public toggleEmailListError() {
    this.emailsListError = false;
  }

  public cancel() {
    this.router.navigate((['lists']));
  }
}
