import {Injectable} from '@angular/core';
import {HttpService} from '@/http.service';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';

@Injectable()
export class ListService {
  private httpService: HttpService;
  private userService: UserService;

  constructor(httpService: HttpService, userService: UserService) {
    this.httpService = httpService;
    this.userService = userService;
  }

  public getListsByUser(): Observable<any> {
    return this.httpService.get(`/lists/${this.userService.currentUser.id}`);
  }

  public addList(list: any): Observable<any> {
    return this.httpService.post(`/list`, list);
  }

  public updateList(list: any): Observable<any> {
    return this.httpService.put(`/list`, list);
  }

  public deleteListById(id: string): Observable<any> {
    return this.httpService.delete(`/list/${id}`);
  }

  public getListById(id: string): Observable<any> {
    return this.httpService.get(`/list/${id}`);
  }
}
