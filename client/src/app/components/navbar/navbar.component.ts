import { Component, OnInit } from '@angular/core';
import {  AuthenticationService  } from '@/services/authentication.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(  
    private authService: AuthenticationService,
    private router:Router) { }

  ngOnInit() {

  }
  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }

}