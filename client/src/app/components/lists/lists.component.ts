import {Component, OnInit} from '@angular/core';
import {ListService} from '@/services/list.service';
import {List} from './list.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  private listService: ListService;
  private route: ActivatedRoute;

  public title: string;
  public button: string;
  public lists: Array<List> = new Array<List>();
  public list: List;

  constructor(listService: ListService, route: ActivatedRoute) {
    this.listService = listService;
    this.route = route;
  }

  ngOnInit() {
    this.title = this.route.snapshot.data.section;

    this.listService.getListsByUser().subscribe((data) => {
      console.log(data);
      this.list = data[0];
      this.lists = data;
    }, () => {

    });
  }

  public create() {

  }
}
