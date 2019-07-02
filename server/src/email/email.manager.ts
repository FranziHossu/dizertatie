import {Model, Types} from 'mongoose';
import {IEmail, emailSchema} from './email.model';
import {AbstractManager} from '../util/shared/abstract.manager';

export class EmailManager extends AbstractManager {
    private Email: Model<IEmail>;

    protected initModel() {
        this.Email = this.connection.model<IEmail>('Email', emailSchema);
    }


    public sendEmail(body: any, success: Function, fail: Function) {
        let err = false;
        for (let i = 0; i < body.to.length; i++) {
            try {
                console.log('Send to email ', body.to[i]);
                this.emailService.send(body.to[i], body.from, body.subject, body.content);
            } catch (e) {
                err = true;
            }
        }

        body.toLists.forEach((element) => {
            element.emails.forEach(email => {
                try {
                    console.log('Send to email from list ', email);

                    this.emailService.send(email, body.from, body.subject, body.content);
                } catch (e) {
                    err = true;
                }
            });
        });

        if (err) {
            fail(false);
        } else {
            success(true);
        }
    }

    public saveEmail(body: any, success: Function, fail: Function) {
        for (let i = 0; i < body.toLists.length; i++) {
            const id = body.toLists[i].id;
            body.toLists[i] = {};
            body.toLists[i]._id = id;
        }
        this.Email.create(body, this.replay(success, fail));
    }

    public getEmailsByUser(id: any, success: Function, fail: Function) {
        this.Email.find({fromId: id}).populate('toLists').exec((this.replay(success, fail)));
    }

    public getEmail(id: any, success: Function, fail: Function) {
        this.Email.findOne({_id: id}).populate('toLists ccLists bccLists').exec((this.replay(success, fail)));
    }

    public getUserNumberEmails(id: any, success: Function, fail: Function) {
        this.Email.find({fromId: id}, {time: 1}).count().exec((this.replay(success, fail)));
    }

    public getEmailsNumber( success: Function, fail: Function) {
        this.Email.find({time: 1}).count().exec((this.replay(success, fail)));
    }

    public deleteEmail(id: any, success: Function, fail: Function) {
        this.Email.deleteOne({_id: id}).exec(this.replay(success, fail));
    }
}
