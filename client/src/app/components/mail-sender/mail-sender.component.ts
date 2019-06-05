import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ConfirmationService} from '@/components/confirmation/confirmation.service';
import {ConfirmationMessage} from '@/components/confirmation/confirmation-message.enum';
import {EmailService} from '@/components/mail-sender/email.service';
import {Email} from '@/components/mail-sender/mail.model';
import {List} from '@/components/lists/list.model';
import {ListService} from '@/components/lists/list.service';
import {AlertService} from '@/components/alert/alert.service';
import {AlertMessage} from '@/components/alert/alert-message';
import {UserService} from "@/services/user.service";
import {SectionTitle} from "@/enums/section-title.enum";
import {MenuService} from '../menu/menu.service';

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
  private router: Router;
  private userService: UserService;
  private menuService: MenuService;

  public email: Email = new Email();
  public toElements: Array<string> = new Array<string>();
  public ccElements: Array<string> = new Array<string>();
  public bccElements: Array<string> = new Array<string>();
  public usedEmails: Array<string> = new Array<string>();
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
  public showSuggestionTo = false;
  public showSuggestionCc = false;
  public showSuggestionBcc = false;
  public sectionTitle = SectionTitle;

  constructor(route: ActivatedRoute, userService: UserService, router: Router,
              confirmationService: ConfirmationService, emailService: EmailService,
              listService: ListService, alertService: AlertService, menuService: MenuService) {
    this.alertService = alertService;
    this.router = router;
    this.listService = listService;
    this.route = route;
    this.userService = userService;
    this.confirmationService = confirmationService;
    this.emailService = emailService;
    this.menuService = menuService;
  }

  ngOnInit() {
    this.title = this.route.snapshot.data.section;

    if (this.title === this.sectionTitle.ViewEmail) {
      this.emailService.getEmailById(this.route.snapshot.params.id).subscribe((data: any) => {
        this.setEmail(data);
      }, () => {

      });
    } else {

      this.listService.listObservable.subscribe((list: List) => {
        if (list) {
          this.email.toLists.push(list);
          this.toElements.push(list.name);
        }
      });
      this.listService.getListsByUser().subscribe((data: any) => {
        this.lists = data;

      });
      this.emailService.getUsedEmails(this.userService.currentUser.id).subscribe((data: any) => {
        this.usedEmails = data;
      }, () => {

      });
    }


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
        this.email.toLists.push(element);
      } else {
        this.email.to.push(this.to);
      }
      this.toElements.push(this.to);
      this.to = '';
    }
  }

  public addEmailCC() {
    if (this.cc !== '') {
      const element = this.getFromLists(this.cc);
      if (element) {
        this.email.ccLists.push(element);
      } else {
        this.email.cc.push(this.cc);
      }
      this.ccElements.push(this.cc);
      this.cc = '';
    }
  }

  public addEmailBCC() {
    if (this.bcc !== '') {
      const element = this.getFromLists(this.bcc);
      if (element) {
        this.email.bccLists.push(element);
      } else {
        this.email.bcc.push(this.bcc);
      }
      this.bccElements.push(this.bcc);
      this.bcc = '';
    }
  }

  public removeEmailFromTo(to: any) {
    const element = this.getFromLists(to);
    if (element) {
      for (let k = 0; k < this.email.toLists.length; k++) {
        if (this.email.toLists[k].id === element.id) {
          this.email.toLists.splice(k, 1);
        }
      }
    } else {
      for (let k = 0; k < this.email.to.length; k++) {
        if (this.email.to[k] === to) {
          console.log('here');
          this.email.to.splice(k, 1);
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
      for (let k = 0; k < this.email.ccLists.length; k++) {
        if (this.email.ccLists[k].id === element.id) {
          this.email.ccLists.splice(k, 1);
        }
      }
    } else {
      for (let k = 0; k < this.email.cc.length; k++) {
        if (this.email.cc[k] === cc) {
          this.email.cc.splice(k, 1);
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
      for (let k = 0; k < this.email.bccLists.length; k++) {
        if (this.email.bccLists[k].id === element.id) {
          this.email.bccLists.splice(k, 1);
        }
      }
    } else {
      for (let k = 0; k < this.email.bcc.length; k++) {
        if (this.email.to[k] === bcc) {
          this.email.bcc.splice(k, 1);
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
      const subscribtion = this.confirmationService.answerObservable.subscribe((answer) => {
        subscribtion.unsubscribe();
        if (answer) {
          this.email.time = new Date();
          this.email.from = this.userService.currentUser.email;
          this.email.fromId = this.userService.currentUser.id;

          const requestSubscription = this.emailService.sendEmail(this.email).subscribe(() => {
            this.alertService.setMessage(AlertMessage.MailSuccessfullySent);
            this.router.navigate(['']);
            this.menuService.changeSection(SectionTitle.None);
            requestSubscription.unsubscribe();
          }, () => {
            requestSubscription.unsubscribe();
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
    this.showSuggestionTo = !this.showSuggestionTo;
  }

  public toggleShowCCAddButton() {
    this.showCcAddButton = !this.showCcAddButton;
    this.showSuggestionCc = !this.showSuggestionCc;
  }

  public toggleShowBccAddButton() {
    this.showBccAddButton = !this.showBccAddButton;
    this.showSuggestionBcc = !this.showSuggestionBcc;
  }

  private setEmail(data: Email) {
    this.email = data;

    for (let i = 0; i < data.to.length; i++) {
      this.toElements.push(data.to[i]);
    }

    for (let i = 0; i < data.cc.length; i++) {
      this.ccElements.push(data.cc[i]);
    }

    for (let i = 0; i < data.bcc.length; i++) {
      this.bccElements.push(data.bcc[i]);
    }

    if (this.bccElements.length !== 0) {
      this.displayBCC = true;
    }

    if (this.ccElements.length !== 0) {
      this.displayCC = true;
    }
  }

  public cancel() {
    this.router.navigate(['']);
    this.menuService.changeSection(SectionTitle.None);
  }
}
