import {Injectable} from '@angular/core';
import {HttpService} from '@/http.service';
import {UserService} from '../../services/user.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {List} from '@/components/lists/list.model';

@Injectable()
export class ListService {
  private httpService: HttpService;
  private userService: UserService;
  private listSubject: BehaviorSubject<List> = new BehaviorSubject(null);

  public listObservable: Observable<List> = this.listSubject.asObservable();

  constructor(httpService: HttpService, userService: UserService) {
    this.httpService = httpService;
    this.userService = userService;
  }

  public getListsByUser(): Observable<any> {
    return this.httpService.get(`/lists/${this.userService.currentUser.id}`);
  }

  public getSharedListsByUser(): Observable<any> {
    return this.httpService.get(`/lists/shared/${this.userService.currentUser.id}`);
  }

  public getMemberOfLists(): Observable<any> {
    return this.httpService.get(`/lists/memberOf/${this.userService.currentUser.email}`);
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

  public nextList(list: List) {
    this.listSubject.next(list);
  }
}
