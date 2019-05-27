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
                this.emailService.send(body.to[i], body.from, body.subject, body.content);
            } catch (e) {
                err = true;
            }
        }

        if(err){
            fail(false);
        }else{
            success(true);
        }
    }

    public saveEmail(body: any, success: Function, fail: Function) {
        this.Email.create(body, this.replay(success, fail));
    }

    public getEmailsByUser(id: any, success: Function, fail: Function) {
        this.Email.find({fromId: id}).exec((this.replay(success, fail)));
    }

    public getEmail(id: any, success: Function, fail: Function) {
        this.Email.findOne({_id: id}).populate('toLists ccLists bccLists').exec((this.replay(success, fail)));
    }
}
