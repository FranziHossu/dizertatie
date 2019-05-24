import {Component, OnInit, Input} from '@angular/core';
import {SectionTitle} from "@/enums/section-title.enum";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: ' title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {
  @Input() public title: string;
  @Input() public button: string;

  private SectionTitles = SectionTitle;
  private router: Router;
  private route: ActivatedRoute;

  constructor(router: Router, route: ActivatedRoute) {
    this.router = router;
    this.route = route;
  }

  ngOnInit() {
    this.setButton();
  }

  private setButton() {
    if (this.SectionTitles.Lists === this.route.snapshot.data.section) {
      this.button = this.SectionTitles.CreateList;
    }
  }

  public navigateTo() {
    this.router.navigate(['list/create']);
  }
}
