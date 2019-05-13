import { Injectable } from "@angular/core";
import { HttpService } from "@/http.service";
import { UserService } from "./user.service";
import { Observable } from "rxjs";

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
}