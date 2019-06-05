import {Component, OnInit} from '@angular/core';
import {ListService} from '@/components/lists/list.service';
import {List} from './list.model';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationService} from "@/components/confirmation/confirmation.service";
import {ConfirmationMessage} from "@/components/confirmation/confirmation-message.enum";
import {UserService} from "@/services/user.service";

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  private listService: ListService;
  private route: ActivatedRoute;
  private confirmationService: ConfirmationService;
  private userService: UserService;

  public title: string;
  public searchedValue = '';
  public button: string;
  public lists: Array<List> = new Array<List>();
  public allLists: Array<List> = new Array<List>();
  public sharedLists: Array<List> = new Array<List>();
  public allSharedLists: Array<List> = new Array<List>();
  public currentTab = false;

  constructor(listService: ListService, route: ActivatedRoute, userService: UserService, confirmationService: ConfirmationService) {
    this.listService = listService;
    this.userService = userService;
    this.route = route;
    this.confirmationService = confirmationService;
  }

  ngOnInit() {
    this.title = this.route.snapshot.data.section;
    this.getUserLists();
    this.getUsersharedLists();


  }

  private getUserLists() {
    this.listService.getListsByUser().subscribe((data) => {
      this.allLists = data;
      this.allLists.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.lists = this.allLists;
    }, () => {

    });
  }

  private getUsersharedLists() {
    this.listService.getSharedListsByUser().subscribe((data) => {
      this.allSharedLists = data;
      this.allSharedLists.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.sharedLists = this.allSharedLists;
    }, () => {

    });
  }

  public deleteList(id: string) {
    this.confirmationService.setMessage(ConfirmationMessage.DeleteList);
    this.confirmationService.answerObservable.subscribe((answer: any) => {
      if (answer) {
        this.listService.deleteListById(id).subscribe((data: any) => {
          if (data) {
            this.removeListById(id);
          }
        }, () => {
        });
      }
    });

  }

  private removeListById(id: string) {
    for (let i = 0; i < this.lists.length; i++) {
      if (this.lists[i].id === id) {
        this.lists.splice(i, 1);
      }
    }
  }

  public searchLists() {
    this.lists = new Array<List>();

    this.allLists.forEach((e) => {
      if (e.name.includes(this.searchedValue)) {
        this.lists.push(e);
      }
    });
  }

  public toggleTab(value: boolean) {
    this.currentTab = value;
  }

  public unsubscribe(list: List) {
    const newList: List = new List();
    newList.emails = list.emails;
    newList.id = list.id;
    newList.name = list.name;
    newList.description = list.description;
    newList.user = list.user;

    for (let j = 0; j < newList.emails.length; j++) {
      if (newList.emails[j] === this.userService.currentUser.email) {
        newList.emails.splice(j, 1);
        break;
      }
    }
    this.listService.updateList(newList).subscribe((data: any) => {
        for (let i = 0; i < this.sharedLists.length; i++) {
          if (this.sharedLists[i].id === list.id) {
            this.sharedLists.splice(i, 1);
            break;
          }
        }
      }, () => {
      }
    );
  }
}
