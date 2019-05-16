export class List {
  public id: string;
  public user: string;
  public lists: Array<string>;
  public name: string;

  constructor() {

  }

  public getEmails() {
    let str = '';
    this.lists.forEach((e) => {
      str += e + ',';
    });
  }
}
