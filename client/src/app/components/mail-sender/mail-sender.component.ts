import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route} from "@angular/router";

@Component({
  selector: 'mail-sender',
  templateUrl: './mail-sender.component.html',
  styleUrls: ['./mail-sender.component.scss']
})
export class MailSenderComponent implements OnInit {
  private route: ActivatedRoute;

  public tos: Array<string> = new Array<string>();
  public ccs: Array<string> = new Array<string>();
  public bccs: Array<string> = new Array<string>();
  public to = '';
  public cc = '';
  public bcc = '';
  public title: string;
  public button: string;
  public displayCC = false;
  public displayBCC = false;
  public subject: any;
  public content: any;

  constructor(route: ActivatedRoute) {
    this.route = route;
  }

  ngOnInit() {
    this.title = this.route.snapshot.data.section;
    this.tos.push('popcris8gm@gmail.com');
    this.tos.push('elena@gmail.com');
  }

  public addEmailTO() {
    if (this.to !== '') {

      for (let i = 0; i < this.tos.length; i++) {
        if (this.tos[i] === this.to) {
          this.to = '';
          return;
        }
      }
      this.tos.push(this.to);
      this.to = '';
    }
  }

  public addEmailCC() {
    if (this.cc !== '') {
      for (let i = 0; i < this.ccs.length; i++) {
        if (this.ccs[i] === this.cc) {
          this.cc = '';
          return;
        }
      }
      this.ccs.push(this.cc);
      this.cc = '';
    }
  }

  public addEmailBCC() {
    if (this.bcc !== '') {
      for (let i = 0; i < this.bccs.length; i++) {
        if (this.bccs[i] === this.bcc) {
          this.bcc = '';
          return;
        }
      }
      this.bccs.push(this.bcc);
      this.bcc = '';
    }
  }

  public removeEmailFromTo(index: any) {
    this.tos.splice(index, 1);
  }

  public removeEmailFromBcc(index: any) {
    this.bccs.splice(index, 1);
  }

  public removeEmailFromCc(index: any) {
    this.ccs.splice(index, 1);
  }

  public toggleBCC() {
    this.displayBCC = !this.displayBCC;
  }

  public toggleCC() {
    this.displayCC = !this.displayCC;
  }

  public sendEmail() {

  }
}
