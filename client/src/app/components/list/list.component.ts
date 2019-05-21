import {Component, OnInit} from '@angular/core';
import {List} from '../lists/list.model';
import {UserService} from '@/services/user.service';
import {ListService} from '@/services/list.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private userService: UserService;
  private listService: ListService;
  private router: Router;

  public list: List = new List();
  public allEmails: Array<string> = new Array();
  public listName: string;
  public email: string;
  public title: string;
  public button: string;

  constructor(userService: UserService, listService: ListService, router: Router, private route: ActivatedRoute) {
    this.userService = userService;
    this.listService = listService;
    this.listService = listService;
  }

  ngOnInit() {
    this.title = this.route.snapshot.data['section'];
  }

  public addEmailToList() {
    if (!this.email) {
      return;
    }
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
