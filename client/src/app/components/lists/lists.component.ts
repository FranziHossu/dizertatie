import {Component, OnInit} from '@angular/core';
import {ListService} from '@/components/lists/list.service';
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

  constructor(listService: ListService, route: ActivatedRoute) {
    this.listService = listService;
    this.route = route;
  }

  ngOnInit() {
    this.title = this.route.snapshot.data.section;

    this.listService.getListsByUser().subscribe((data) => {
      this.lists = data;
    }, () => {

    });
  }

  public deleteList(id: string) {
    this.listService.deleteListById(id).subscribe((data: any) => {
      if (data) {
        this.removeListById(id);
      }
    }, () => {

    });
  }

  private removeListById(id: string) {
    for (let i = 0; i < this.lists.length; i++) {
      if (this.lists[i].id === id) {
        this.lists.splice(i, 1);
      }
    }
  }
}
