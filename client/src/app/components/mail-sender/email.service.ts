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

  public getUsedEmails(id: any) {
    return this.httpService.get(`/emails/user/${id}`);
  }

  public getUserEmails(id: any) {
    return this.httpService.get(`/complete-emails/user/${id}`);
  }

  public getEmailById(id: any) {
    return this.httpService.get(`/email/${id}`);
  }
}
