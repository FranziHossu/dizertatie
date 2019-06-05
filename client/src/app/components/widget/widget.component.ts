import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {List} from '@/components/lists/list.model';
import {Router} from "@angular/router";
import {EmailService} from "@/components/mail-sender/email.service";
import {ListService} from "@/components/lists/list.service";

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() list: List;
  @Input() shared: boolean;
  @Output() delete: EventEmitter<string> = new EventEmitter();
  @Output() emitUnsubscribe: EventEmitter<List> = new EventEmitter();

  private router: Router;
  private listService: ListService;

  constructor(router: Router, listService: ListService) {
    this.router = router;
    this.listService = listService;
  }

  ngOnInit() {
  }

  public emitDelete() {
    this.delete.emit(this.list.id);
  }

  public handleUnsubscribe() {
    this.emitUnsubscribe.emit(this.list);
  }

  public edit() {
    this.router.navigate([`list/edit/${this.list.id}`]);
  }

  public sendEmailToList() {
    this.listService.nextList(this.list);
    this.router.navigate(['email/create']);
  }
}
