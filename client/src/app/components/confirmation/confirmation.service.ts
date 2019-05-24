import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ConfirmationMessage} from "@/components/confirmation/confirmation-message.enum";

@Injectable()
export class ConfirmationService {
  private confirmationSubject: Subject<boolean> = new Subject();
  private answerSubject: Subject<boolean> = new Subject();

  public confirmationObservable: Observable<boolean> = this.confirmationSubject.asObservable();
  public answerObservable: Observable<boolean> = this.answerSubject.asObservable();
  public message = '';

  constructor() {

  }

  public nextConfirmation(value: boolean) {
    this.confirmationSubject.next(value);
  }

  public nextAnswer(value: boolean) {
    this.message = '';
    this.answerSubject.next(value);
  }

  public setMessage(SendEmail: ConfirmationMessage) {
    this.message = SendEmail;
    this.nextConfirmation(true);
  }
}
