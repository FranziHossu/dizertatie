import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ElementsService} from '@/components/popup-elements/elements.service';
import {ListService} from '@/components/lists/list.service';
import {UserService} from "@/services/user.service";

@Component({
  selector: 'elements',
  templateUrl: './popup-elements.component.html',
  styleUrls: ['./popup-elements.component.scss']
})
export class PopupElementsComponent implements OnInit {
  @Input() public displayLists: boolean;
  @Input() public displayUsers: boolean;

  private array: Array<any>;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private listService: ListService, private elementsService: ElementsService) {

  }

  ngOnInit() {
    if (this.displayUsers) {
      this.userService.getUsers().subscribe((data: Array<any>) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === this.userService.currentUser.id) {
            data.splice(i, 1);
          }
          data[i].selected = false;
        }

        this.array = data;
      });
    } else {
      this.listService.getListsByUser().subscribe((data: Array<any>) => {
        data.forEach((e) => {
          e.selected = false;
        });
        this.array = data;
      });
    }

  }

  cancel() {
    this.elementsService.displayElements(0);
  }

  submit() {
    const responseArray: Array<any> = new Array<any>();

    this.array.forEach((e) => {
      if (e.selected) {
        responseArray.push(e);
      }
    });

    this.elementsService.sendResponse(responseArray);
    this.elementsService.displayElements(0);

  }

  toggle(item: any) {
    item.selected = !item.selected;
  }
}
