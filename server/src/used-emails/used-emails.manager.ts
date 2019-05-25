import {Model, Types} from 'mongoose';
import {IEmail, emailSchema} from './email.model';
import {AbstractManager} from '../util/shared/abstract.manager';
import {MailService} from "../util/shared/mail.service";

const bCrypt = require("bcrypt-nodejs");

enum Selectors {
}

export class EmailManager extends AbstractManager {
    private Email: Model<IEmail>;

    protected initModel() {
        this.Email = this.connection.model<IEmail>('Email', emailSchema);
    }


    public sendEmail(body: any, success: Function, fail: Function) {
        try {
            this.emailService.send(body.to, body.from, body.subject, body.content);
            success(true);
        } catch (e) {
            fail(e);
        }
    }
}
