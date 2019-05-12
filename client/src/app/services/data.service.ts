import { Injectable } from "@angular/core";
import { HttpService } from "@/http.service";
import { Observable } from "rxjs";

@Injectable()
export class DataService {
    private httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    public getData(): Observable<any>{
        return this.httpService.get(`/data`);
    }
}