/** uses the authentication service to login to the application. 
If the user is already logged in they are automatically redirected to the home page. */


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '@/services/alert.service';
import { UserService } from '@/services/user.service';
import { User } from '@/models';
import { AuthenticationService } from '@/services/authentication.service';
import { LoadingService } from '@/services/loading.service';
import { LocalStorageService } from '@/services/local-storage.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private formBuilder: FormBuilder;
    private route: ActivatedRoute;
    private router: Router;
    private alertService: AlertService;
    private userService: UserService;
    private authService: AuthenticationService;
    private loadingService: LoadingService;
    private localStorageService: LocalStorageService;

    public loginForm: FormGroup;
    public status: boolean = false;

    constructor(formBuilder: FormBuilder,
        route: ActivatedRoute,
        router: Router,
        alertService: AlertService,
        userService: UserService,
        authService: AuthenticationService,
        loadingService: LoadingService,
        localStorageService: LocalStorageService
    ) {
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.alertService = alertService;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.loadingService = loadingService;
        this.localStorageService = localStorageService;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.loadingService.loadingObservable.subscribe((value: boolean) => {
            this.status = value;
        });
    }

    /** convenience getter for easy access to form fields  */
    get f() { return this.loginForm.controls; }

    public onSubmit() {
        if (!this.loginForm.invalid) {
            let user: User = new User();
            user.username = this.f.username.value;
            user.password = this.f.password.value;

            this.loadingService.next(true);
            this.userService.login(user)
                .subscribe(
                    (data: any) => {
                        this.localStorageService.setItem("userID", data.id);
                        this.userService.currentUser = data;
                        this.router.navigate(['home']);
                        this.loadingService.next(false);
                    },
                    (error: any) => {
                        this.alertService.error('Username and password may be wrong');
                        this.loadingService.next(false);
                    });
        }

    }


}