import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loadingObservable: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  public next(value: boolean) {
    this.loadingSubject.next(value);
  }
}
