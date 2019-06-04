import {Model, Types} from 'mongoose';
import {IUser, userSchema} from './user.model';
import {AbstractManager} from '../util/shared/abstract.manager';

const bCrypt = require("bcrypt-nodejs");

enum Selectors {
}

export class UserManager extends AbstractManager {
    private User: Model<IUser>;

    protected initModel() {
        this.User = this.connection.model<IUser>('User', userSchema);
    }

    public findByUsernameAndPassword(data: any, success: Function, error: Function) {
        this.User.findOne({username: data.username}).exec(this.replay(success, error));
    }

    public createUser(data: any, success: Function, error: Function) {
        bCrypt.genSalt(10, (err, salt) => {
            bCrypt.hash(data.password, salt, null, (err, hash) => {
                if (err) throw err;
                data.password = hash;
                this.User.create(data, this.replay(success, error));
            });
        });
    }

    public getUser(id: string, success: Function, error: Function) {
        this.User.findOne({_id: id}).exec(this.replay(success, error));
    }

    public updateUser(id: any, body: any, success: Function, fail: Function) {
        this.User.update({_id: id}, body).exec(this.replay(success, fail));
    }

    public changePassword(id: any, success: Function, fail: Function) {

        this.User.findOne({_id: id}, (err, user) => {
            this.emailService.send(user.email, `support@ubbcluj.ro.`, `Reset password`, 'the link');
            success(true);
        });
    }
}
