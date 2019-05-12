/** contains a standard set of CRUD methods for managing users
it acts as the interface between the Angular application and the backend api */


import { Injectable } from '@angular/core';

import { User } from '../models';
import { Observable } from 'rxjs';
import { HttpService } from '@/http.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    private httpService: HttpService;
    public currentUser: User;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    public login(user: User): Observable<any> {
        return this.httpService.post('/user/login', user);
    }

    public register(user: User): Observable<any> {
        return this.httpService.post('/user/register', user);
    }

    public getUser(id: string): Observable<any> {
        console.log('fmm')
        return this.httpService.get(`/user/${id}`);
    }

    // getAll() {
    //     return this.http.get<User[]>(`${config.apiUrl}/users`);
    // }

    // getById(id: number) {
    //     return this.http.get(`${config.apiUrl}/users/${id}`);
    // }

    // register(user: User) {
    //     return this.http.post(`${config.apiUrl}/users/register`, user);
    // }

    // update(user: User) {
    //     return this.http.put(`${config.apiUrl}/users/${user.id}`, user);
    // }

    // delete(id: number) {
    //     return this.http.delete(`${config.apiUrl}/users/${id}`);
    // }
}
