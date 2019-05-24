export class Mail {
  public from: string;
  public to: Array<string> = new Array<string>();
  public toLists: Array<string> = new Array<string>();
  public cc: Array<string> = new Array<string>();
  public ccLists: Array<string> = new Array<string>();
  public bcc: Array<string> = new Array<string>();
  public bccLists: Array<string> = new Array<string>();
  public subject: string;
  public content: string;
}
