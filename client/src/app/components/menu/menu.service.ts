import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";


@Injectable()
export class MenuService{
    private menuSubject: Subject<string> = new Subject();

    public menuObservable: Observable<string> = this.menuSubject.asObservable();

    constructor(){

    }

    public changeSection(value: string){
        this.menuSubject.next(value);
    }
}