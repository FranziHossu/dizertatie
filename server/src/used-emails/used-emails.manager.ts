import {Model} from 'mongoose';
import {usedEmailsSchema, IUsedEmail} from './used-emails.model';
import {AbstractManager} from '../util/shared/abstract.manager';

export class UsedEmailsManager extends AbstractManager {
    private UsedEmails: Model<IUsedEmail>;

    protected initModel() {
        this.UsedEmails = this.connection.model<IUsedEmail>('UsedEmail', usedEmailsSchema);
    }

    public getEmailsByUserId(id: any, success: Function, fail: Function) {
        this.UsedEmails.find({user: id}).exec(this.replay(success, fail));
    }

    public saveMany(array: Array<any>, success: Function, fail: Function) {
        this.UsedEmails.insertMany(array, this.replay(success, fail));
    }
}
