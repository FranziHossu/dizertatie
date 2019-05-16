import {Component, OnInit} from '@angular/core';
import {ListService} from '@/services/list.service';
import {UserService} from '@/services/user.service';
import {List} from './list.model';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  private listService: ListService;

  public lists: Array<List> = new Array<List>();

  constructor(listService: ListService) {
    this.listService = listService;
  }

  ngOnInit() {
    this.listService.getListsByUser().subscribe((data) => {
      console.log(data);
      this.lists = data;
    }, () => {

    });
  }

  public create() {

  }
}
