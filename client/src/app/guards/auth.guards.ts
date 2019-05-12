// used to prevent unauthenticated users from accessing restricted routes 

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '@/services/user.service';
import { LocalStorageService } from '@/services/local-storage.service';
import { Subject, Observable } from 'rxjs';
import { User } from '@/models';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private userService: UserService;
    private router: Router;
    private localStorageService: LocalStorageService;

    constructor(
        router: Router,
        userService: UserService,
        localStorageService: LocalStorageService
    ) {
        this.router = router;
        this.userService = userService;
        this.localStorageService = localStorageService;
    }

    canActivate() {
        if (this.userService.currentUser == undefined) {
            if (this.localStorageService.getItem("userID") == undefined) {
                this.router.navigate(['login']);
                return false;
            } else {
                const subject: Subject<boolean> = new Subject<boolean>();
                const obs: Observable<boolean> = subject.asObservable();

                this.userService.getUser(this.localStorageService.getItem("userID")).subscribe((data: User) => {
                    if (data == undefined) {
                        this.router.navigate(['login']);
                        subject.next(false);
                    } else {
                        this.userService.currentUser = data;
                        subject.next(true);
                    }
                });
                return obs;
            }
        } else {
            return true;
        }


        // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //     if (this.userService.currentUser) {
        //         // authorised so return true
        //         return true;
        //     }

        //     // not logged in so redirect to login page with the return url
        //     this.router.navigate(['/login']);
        //     return false;
        // }
    }
}