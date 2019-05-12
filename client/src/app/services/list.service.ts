import { Injectable } from "@angular/core";
import { HttpService } from "@/http.service";
import { UserService } from "./user.service";

@Injectable()
export class ListService {
    private httpService: HttpService;
    private userService: UserService;

    constructor(httpService: HttpService, userService: UserService) {
        this.httpService = httpService;
        this.userService = userService;
    }

    public getListsByUser() {
        this.httpService.get(`/lists/${this.userService.currentUser.id}`);
    }
}