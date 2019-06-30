import {Subject} from 'rxjs';

export class ElementsService {
  private elementsDisplaySubject = new Subject<number>();
  private elementsAnswerSubject = new Subject<any>();

  public elementsDisplayObservable = this.elementsDisplaySubject.asObservable();
  public elementsAnswerObservable = this.elementsAnswerSubject.asObservable();

  constructor() {

  }

  public displayElements(nr: any) {
    this.elementsDisplaySubject.next(nr);
  }

  sendResponse(responseArray: Array<any>) {
    this.elementsAnswerSubject.next(responseArray);
  }
}
