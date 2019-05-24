import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AlertService {
  private alertSubject: Subject<boolean> = new Subject();

  public alertObservable: Observable<boolean> = this.alertSubject.asObservable();
  public message: string;

  constructor() {

  }

  public setMessage(message: string) {
    if (message) {
      this.message = message;
      this.alertSubject.next(true);
    } else {
      this.alertSubject.next(false);
    }
  }
}
