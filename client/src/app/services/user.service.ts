/** contains a standard set of CRUD methods for managing users
 it acts as the interface between the Angular application and the backend api */


import {Injectable} from '@angular/core';

import {User} from '../models';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpService} from '@/http.service';
import {UserNotification} from "@/models/notification";

@Injectable({providedIn: 'root'})
export class UserService {
  private userProfileSubject = new BehaviorSubject(null);
  private httpService: HttpService;

  public currentUser: User;
  public userProfileObservable = this.userProfileSubject.asObservable();

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

  public updateUserPassword(user: User): Observable<any> {
    return this.httpService.put(`/user/password/${user.id}`, user);
  }

  public changePassword() {
    return this.httpService.get(`/user/password/${this.currentUser.id}`);
  }

  public getUserByPasswordToken(token: string) {
    return this.httpService.get(`/user/password-token/${token}`);
  }

  public confirmAccount(token: string) {
    return this.httpService.get(`/user/confirmation/${token}`);
  }

  public getAccountToken(token: string) {
    return this.httpService.get(`/user/token/${token}`);
  }

  public getUsers() {
    return this.httpService.get(`/users`);
  }

  public deleteUser(id: any) {
    return this.httpService.delete(`/user/${id}`);
  }


  public sendNotification(notification: UserNotification) {
    return this.httpService.post(`/notification`, notification);
  }

  public getUserNotifications() {
    return this.httpService.get(`/notifications/${this.currentUser.id}`);
  }

  public setUserProfille(user: any) {
    this.userProfileSubject.next(user);
  }
}
