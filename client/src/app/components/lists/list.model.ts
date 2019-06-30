export class List {
  public id: string;
  public user: any;
  public emails: Array<string> = new Array<string>();
  public shared: Array<string> = new Array<string>();
  public name: string;
  public description: string;
  public selected = false;

  constructor() {

  }

  public getEmails() {
    let str = '';
    this.emails.forEach((e) => {
      str += e + ',';
    });
  }
}
