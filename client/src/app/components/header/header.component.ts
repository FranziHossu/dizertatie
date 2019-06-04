import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "@/services/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private localStorageService: LocalStorageService;
  private router: Router;


  constructor(router: Router, localStorageService: LocalStorageService) {
    this.router = router;
    this.localStorageService = localStorageService;
  }

  ngOnInit() {
  }

  public logout() {
    this.localStorageService.clear();
    this.router.navigate(['login']);
  }
}
