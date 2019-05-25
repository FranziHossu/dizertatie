import {Component, OnInit} from '@angular/core';
import {SectionRoutes} from '@/enums/section-routes.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionTitle} from "@/enums/section-title.enum";

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private router: Router;
  private route: ActivatedRoute;

  public sectionRoutes = SectionRoutes;
  public currentSection: SectionTitle;
  public sectionTitles = SectionTitle;

  constructor(router: Router, route: ActivatedRoute) {
    this.router = router;
    this.route = route;
  }

  ngOnInit() {
    this.setCurrentSection(this.router.url);
  }

  public navigateTo(route: any, value: any) {
    this.router.navigate([route]);
    this.setCurrentSectionValue(value);
  }

  private setCurrentSection(url: string) {
    url = url.split('/')[1];

    if (url === 'email') {
      this.currentSection = SectionTitle.CreateEmail;
    } else if (url === 'statistics') {
      this.currentSection = SectionTitle.Statistics;
    } else if (url === 'lists' || url === 'list') {
      this.currentSection = SectionTitle.Lists;
    } else if (url === 'profile') {
      this.currentSection = SectionTitle.Profile;
    }
  }

  public setCurrentSectionValue(value: any) {
    this.currentSection = value;
  }
}
