import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {List} from '@/components/lists/list.model';
import {Router} from "@angular/router";

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() list: List;
  @Output() delete: EventEmitter<string> = new EventEmitter();

  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {
  }

  public emitDelete() {
    this.delete.emit(this.list.id);
  }

  public edit() {
    this.router.navigate([`list/edit/${this.list.id}`]);
  }
}
