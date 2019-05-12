/** gets the current user from the authentication service by subscribing to the currentUser observable 
in the authentication service */

import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '@/models/user';
import { UserService } from '@/services/user.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    private userService: UserService;
    private user: User;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    ngOnInit() { this.user = this.userService.currentUser; }

}