import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mail-sender',
  templateUrl: './mail-sender.component.html',
  styleUrls: ['./mail-sender.component.scss']
})
export class MailSenderComponent implements OnInit {
  public tos: Array<string> = new Array<string>();
  public ccs: Array<string> = new Array<string>();
  public to: string = '';
  public cc: string = '';

  constructor() { }

  ngOnInit() {
  }

  public addEmailTo() {
    this.tos.push(this.to);
    this.to = '';
  }

  public addEmailCc() {
    this.ccs.push(this.cc);
    this.cc = '';
  }

}
