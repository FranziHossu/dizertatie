import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {List} from '@/components/lists/list.model';
import {Router} from "@angular/router";
import {EmailService} from "@/components/mail-sender/email.service";
import {ListService} from "@/components/lists/list.service";
import {MenuService} from "@/components/menu/menu.service";
import {SectionTitle} from "@/enums/section-title.enum";
import {ConfirmationService} from "@/components/confirmation/confirmation.service";
import {Subscription} from "rxjs";

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
  private menuService: MenuService;
  private confirmationService: ConfirmationService;

  constructor(router: Router, confirmationService: ConfirmationService, listService: ListService, menuService: MenuService) {
    this.confirmationService = confirmationService;
    this.router = router;
    this.listService = listService;
    this.menuService = menuService;
  }

  ngOnInit() {
  }

  public emitDelete() {
    this.delete.emit(this.list.id);
  }

  public handleUnsubscribe() {
    this.confirmationService.setMessage(`Are you sure you want to unsubscribe from ${this.list.name} ?`);
    const subs: Subscription = this.confirmationService.answerObservable.subscribe((answer: any) => {
      if (answer) {
        this.emitUnsubscribe.emit(this.list);
      }
      subs.unsubscribe();
    });
  }

  public edit() {
    this.menuService.changeSection('email');
    this.router.navigate([`list/edit/${this.list.id}`]);
  }

  public sendEmailToList() {
    this.menuService.changeSection('email');
    this.listService.nextList(this.list);
    this.router.navigate(['email/create']);
  }
}
