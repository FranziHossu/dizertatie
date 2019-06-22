import { Component, OnInit } from '@angular/core';
import { SectionRoutes } from '@/enums/section-routes.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionTitle } from '@/enums/section-title.enum';
import { MenuService } from './menu.service';
import { LocalStorageService } from '@/services/local-storage.service';
import { User } from "@/models";
import { UserService } from "@/services/user.service";

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private router: Router;
  private route: ActivatedRoute;
  private menuService: MenuService;
  private userService: UserService;
  private localStorageService: LocalStorageService;

  public sectionRoutes = SectionRoutes;
  public currentSection: SectionTitle;
  public sectionTitles = SectionTitle;
  public user: User;

  constructor(router: Router, userService: UserService, route: ActivatedRoute, menuService: MenuService, localStorageService: LocalStorageService) {
    this.router = router;
    this.route = route;
    this.menuService = menuService;
    this.localStorageService = localStorageService;
    this.userService = userService;
  }

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.setCurrentSection(this.router.url);
    this.menuService.menuObservable.subscribe((value: string) => {
      this.setCurrentSectionByGivenValue(value);
    });
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
    } else if (url === 'users' || url === 'user') {
      this.currentSection = SectionTitle.Users;
    }
  }

  private setCurrentSectionByGivenValue(section: string) {
    if (section === '') {
      this.currentSection = null;
    } else if (section === 'email') {
      this.currentSection = SectionTitle.CreateEmail;
    } else if (section === 'statistics') {
      this.currentSection = SectionTitle.Statistics;
    } else if (section === 'lists' || section === 'list') {
      this.currentSection = SectionTitle.Lists;
    } else if (section === 'Profile') {
      this.currentSection = SectionTitle.Profile;
    } else if (section === 'users' || section == 'user') {
      this.currentSection = SectionTitle.Users;
    }
  }

  public setCurrentSectionValue(value: any) {
    this.currentSection = value;
  }
}
