import {Component, OnInit} from '@angular/core';
import {ListService} from '@/components/lists/list.service';
import {List} from './list.model';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationService} from "@/components/confirmation/confirmation.service";
import {ConfirmationMessage} from "@/components/confirmation/confirmation-message.enum";

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  private listService: ListService;
  private route: ActivatedRoute;
  private confirmationService: ConfirmationService;

  public title: string;
  public searchedValue = '';
  public button: string;
  public lists: Array<List> = new Array<List>();
  public allLists: Array<List> = new Array<List>();

  constructor(listService: ListService, route: ActivatedRoute, confirmationService: ConfirmationService) {
    this.listService = listService;
    this.route = route;
    this.confirmationService = confirmationService;
  }

  ngOnInit() {
    this.title = this.route.snapshot.data.section;

    this.listService.getListsByUser().subscribe((data) => {
      this.allLists = data;
      this.allLists.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.lists = this.allLists;
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
}
