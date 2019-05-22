import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class ConfirmationService {
  private confirmationSubject: Subject<boolean> = new Subject();

  public confirmationObservable: Observable<boolean> = this.confirmationSubject.asObservable();


  constructor() {

  }

  public next(value: boolean) {
    this.confirmationSubject.next(value);
  }

}
