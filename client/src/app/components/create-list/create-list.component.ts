import { Component, OnInit } from '@angular/core';
import { List } from '../lists/list.model';
import { UserService } from '@/services/user.service';
import { ListService } from '@/services/list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit {
  private userService: UserService;
  private listService: ListService;
  private router: Router;

  public list: List = new List();
  public allEmails: Array<string> = new Array();
  public listName: string;
  public email: string;

  constructor(userService: UserService, listService: ListService, router: Router) {
    this.userService = userService;
    this.listService = listService;
    this.listService = listService;
  }

  ngOnInit() {
  }

  public addEmailToList() {
    for (let i: number = 0; i < this.list.emails.length; i++) {
      if (this.list.emails[i] === this.email) {
        this.email = '';
        return;
      }
    }
    this.list.emails.push(this.email);
    this.email = '';
  }

  public removeEmailFromList(email: string) {
    for (let i: number = 0; i < this.list.emails.length; i++) {
      if (this.list.emails[i] === email) {
        this.list.emails.splice(i, 1);
        return;
      }
    }
  }

  public saveList() {
    this.list.name = this.listName;
    this.list.user = this.userService.currentUser.id;
    this.listService.addList(this.list).subscribe(() => {
      // this.router.navigate['list'];
    }, () => {

    });
  }

}
