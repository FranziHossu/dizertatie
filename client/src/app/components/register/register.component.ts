// creates a new user with the user service when the register form is submitted

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { LoadingService } from '@/services/loading.service';


@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    public status: boolean = false;

    private formBuilder: FormBuilder;
    private router: Router;
    private userService: UserService;
    private alertService: AlertService;
    private loadingService: LoadingService;

    constructor(
        formBuilder: FormBuilder,
        router: Router,
        userService: UserService,
        alertService: AlertService,
        loadingService: LoadingService
    ) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.loadingService = loadingService
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(122)]],
            lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(122)]],
            username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(122)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(122)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(122)]]
        });

        this.loadingService.loadingObservable.subscribe((value: boolean) => {
            this.status = value;
        });
    }

    /** convenience getter for easy access to form fields */
    get f() { return this.registerForm.controls; }

    onSubmit() {
        if (!this.registerForm.invalid) {
            this.loadingService.next(true);
            this.userService.register(this.registerForm.value)
                .subscribe(
                    (data: any) => {
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['login']);
                        this.loadingService.next(false);
                    },
                    (error: Error) => {
                        this.alertService.error('Failed to register user');
                        this.loadingService.next(false);
                    });
        }
    }
}