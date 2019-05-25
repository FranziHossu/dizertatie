import {List} from '@/components/lists/list.model';

export class Mail {
  public from: string;
  public fromId: number;
  public to: Array<string> = new Array<string>();
  public toLists: Array<List> = new Array<List>();
  public cc: Array<string> = new Array<string>();
  public ccLists: Array<List> = new Array<List>();
  public bcc: Array<string> = new Array<string>();
  public bccLists: Array<List> = new Array<List>();
  public subject: string;
  public content: string;
  public time: Date;
  public timeAsDate: string;
  public timeAsHours: string;
}
