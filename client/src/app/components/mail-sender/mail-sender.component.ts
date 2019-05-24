import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route} from '@angular/router';
import {ConfirmationService} from '@/components/confirmation/confirmation.service';
import {ConfirmationMessage} from '@/components/confirmation/confirmation-message.enum';
import {EmailService} from '@/components/mail-sender/email.service';
import {Mail} from '@/components/mail-sender/mail.model';
import {List} from '@/components/lists/list.model';
import {ListService} from '@/components/lists/list.service';
import {AlertService} from '@/components/alert/alert.service';
import {AlertMessage} from '@/components/alert/alert-message';

@Component({
  selector: 'mail-sender',
  templateUrl: './mail-sender.component.html',
  styleUrls: ['./mail-sender.component.scss']
})
export class MailSenderComponent implements OnInit {
  private route: ActivatedRoute;
  private confirmationService: ConfirmationService;
  private emailService: EmailService;
  private lists: Array<List>;
  private listService: ListService;
  private alertService: AlertService;

  public mail: Mail = new Mail();
  public toElements: Array<string> = new Array<string>();
  public ccElements: Array<string> = new Array<string>();
  public bccElements: Array<string> = new Array<string>();
  public to = '';
  public cc = '';
  public bcc = '';
  public title: string;
  public button: string;
  public displayCC = false;
  public displayBCC = false;
  public subject: any;
  public content: any;
  public errorTo: boolean;
  public showToAddButton = false;
  public showCcAddButton = false;
  public showBccAddButton = false;

  constructor(route: ActivatedRoute, confirmationService: ConfirmationService, emailService: EmailService, listService: ListService, alertService: AlertService) {
    this.alertService = alertService;
    this.listService = listService;
    this.route = route;
    this.confirmationService = confirmationService;
    this.emailService = emailService;
  }

  ngOnInit() {
    this.listService.getListsByUser().subscribe((data: any) => {
      this.lists = data;
    });
    this.title = this.route.snapshot.data.section;
  }

  private getFromLists(name: any) {
    for (let i = 0; i < this.lists.length; i++) {
      if (this.lists[i].name === name) {
        return this.lists[i];
      }
    }
    return null;
  }

  public addToElement() {
    if (this.to !== '') {
      const element = this.getFromLists(this.to);
      if (element) {
        this.mail.toLists.push(element.id);
      } else {
        this.mail.to.push(this.to);
      }
      this.toElements.push(this.to);
      this.to = '';
    }
  }

  public addEmailCC() {
    if (this.cc !== '') {
      const element = this.getFromLists(this.cc);
      if (element) {
        this.mail.ccLists.push(element.id);
      } else {
        this.mail.cc.push(this.cc);
      }
      this.ccElements.push(this.cc);
      this.cc = '';
    }
  }

  public addEmailBCC() {
    if (this.bcc !== '') {
      const element = this.getFromLists(this.bcc);
      if (element) {
        this.mail.bccLists.push(element.id);
      } else {
        this.mail.bcc.push(this.bcc);
      }
      this.bccElements.push(this.bcc);
      this.bcc = '';
    }
  }

  public removeEmailFromTo(to: any) {
    const element = this.getFromLists(to);
    if (element) {
      for (let k = 0; k < this.mail.toLists.length; k++) {
        if (this.mail.toLists[k] === element.id) {
          this.mail.toLists.splice(k, 1);
        }
      }
    } else {
      for (let k = 0; k < this.mail.to.length; k++) {
        if (this.mail.to[k] === to) {
          console.log('here');
          this.mail.to.splice(k, 1);
        }
      }
    }

    for (let k = 0; k < this.toElements.length; k++) {
      if (this.toElements[k] === to) {
        this.toElements.splice(k, 1);
      }
    }
  }

  public removeEmailFromCc(cc: any) {
    const element = this.getFromLists(cc);
    if (element) {
      for (let k = 0; k < this.mail.ccLists.length; k++) {
        if (this.mail.ccLists[k] === element.id) {
          this.mail.ccLists.splice(k, 1);
        }
      }
    } else {
      for (let k = 0; k < this.mail.cc.length; k++) {
        if (this.mail.cc[k] === cc) {
          this.mail.cc.splice(k, 1);
        }
      }
    }

    for (let k = 0; k < this.ccElements.length; k++) {
      if (this.ccElements[k] === cc) {
        this.ccElements.splice(k, 1);
      }
    }
  }

  public removeEmailFromBcc(bcc: any) {
    const element = this.getFromLists(bcc);
    if (element) {
      for (let k = 0; k < this.mail.bccLists.length; k++) {
        if (this.mail.bccLists[k] === element.id) {
          this.mail.bccLists.splice(k, 1);
        }
      }
    } else {
      for (let k = 0; k < this.mail.bcc.length; k++) {
        if (this.mail.to[k] === bcc) {
          this.mail.bcc.splice(k, 1);
        }
      }
    }

    for (let k = 0; k < this.bccElements.length; k++) {
      if (this.bccElements[k] === bcc) {
        this.bccElements.splice(k, 1);
      }
    }
  }

  public toggleBCC() {
    this.displayBCC = !this.displayBCC;
  }

  public toggleCC() {
    this.displayCC = !this.displayCC;
  }

  public sendEmail() {
    if (this.validateMail()) {
      this.confirmationService.setMessage(ConfirmationMessage.SendEmail);
      this.confirmationService.answerObservable.subscribe((answer) => {
        if (answer) {
          this.mail.subject = this.subject;
          this.mail.content = this.content;

          this.emailService.sendEmail(this.mail).subscribe(() => {
            this.alertService.setMessage(AlertMessage.MailSuccessfullySent);
          }, () => {
            console.log('error');
          });
        }
      });
    }
  }

  private validateMail() {
    if (!this.toElements.length) {
      this.alertService.setMessage(AlertMessage.NoRecipient);
      this.errorTo = true;
      return false;
    }
    return true;
  }

  public toggleShowToAddButton() {
    this.showToAddButton = !this.showToAddButton;
  }

  public toggleShowCCAddButton() {
    this.showCcAddButton = !this.showCcAddButton;
  }

  public toggleShowBccAddButton() {
    this.showBccAddButton = !this.showBccAddButton;
  }
}
