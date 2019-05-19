export class List {
  public id: string;
  public user: any;
  public emails: Array<string> = new Array<string>();
  public name: string;

  constructor() {

  }

  public getEmails() {
    let str = '';
    this.emails.forEach((e) => {
      str += e + ',';
    });
  }
}
