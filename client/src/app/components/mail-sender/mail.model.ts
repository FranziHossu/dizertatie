import {List} from '@/components/lists/list.model';

export class Email {
  public from: string;
  public toString: string;
  public fromId: number;
  public to: Array<string> = new Array<string>();
  public toLists: Array<List> = new Array<List>();
  public subject: string;
  public content: string;
  public time: Date;
  public timeAsDate: string;
  public timeAsHours: string;
}
