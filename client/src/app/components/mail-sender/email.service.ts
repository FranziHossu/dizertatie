import {Injectable} from '@angular/core';
import {HttpService} from '@/http.service';


@Injectable()
export class EmailService {
  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  public sendEmail(email: any) {
    return this.httpService.post(`/email`, email);
  }
}
