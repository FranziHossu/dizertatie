import {Component, OnInit} from '@angular/core';
import {SectionRoutes} from '@/enums/section-routes.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public sectionRoutes = SectionRoutes;

  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {
  }

  public navigateTo(route: any) {
    this.router.navigate([route]);
  }
}
