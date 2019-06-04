/** contains a standard set of CRUD methods for managing users
 it acts as the interface between the Angular application and the backend api */


import {Injectable} from '@angular/core';

import {User} from '../models';
import {Observable} from 'rxjs';
import {HttpService} from '@/http.service';

@Injectable({providedIn: 'root'})
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
    return this.httpService.get(`/user/${id}`);
  }

  public updateUser(user: User): Observable<any> {
    return this.httpService.put(`/user/${user.id}`, user);
  }

  public changePassword() {
    return this.httpService.get(`/user/password/${this.currentUser.id}`);
  }
}
