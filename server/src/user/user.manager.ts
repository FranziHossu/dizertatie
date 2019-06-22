import { Model, Types } from 'mongoose';
import { IUser, userSchema } from './user.model';
import { AbstractManager } from '../util/shared/abstract.manager';

const bCrypt = require("bcrypt-nodejs");
const passwordTokenLength = 20;

enum Selectors {
}

export class UserManager extends AbstractManager {
    private User: Model<IUser>;

    protected initModel() {
        this.User = this.connection.model<IUser>('User', userSchema);
    }

    public findByUsernameAndPassword(data: any, success: Function, error: Function) {
        this.User.findOne({ username: data.username }).exec(this.replay(success, error));
    }

    public createUser(data: any, success: Function, error: Function) {
        bCrypt.genSalt(10, (err, salt) => {
            bCrypt.hash(data.password, salt, null, (err, hash) => {
                if (err) throw err;
                data.password = hash;
                data.token = this.generateToken();
                this.User.create(data, this.replay(success, error));
            });
        });
    }

    public getUser(id: string, success: Function, error: Function) {
        this.User.findOne({ _id: id }).exec(this.replay(success, error));
    }

    public updateUser(id: any, body: any, success: Function, fail: Function) {
        this.User.update({ _id: id }, body).exec(this.replay(success, fail));
    }

    public updateUserPassword(id: any, body: any, success: Function, fail: Function) {
        bCrypt.genSalt(10, (err, salt) => {
            bCrypt.hash(body.password, salt, null, (err, hash) => {
                if (err) throw err;
                body.password = hash;
                this.User.update({ _id: id }, body).exec(this.replay(success, fail));
            });
        });
    }

    public changePassword(id: any, success: Function, fail: Function) {
        const passwordToken: string = this.generateToken();

        this.User.findOne({ _id: id }, (err, user) => {
            user.passwordToken = passwordToken;
            this.User.update({ _id: user.id }, user, (err, data) => {
                console.log('eror:', err);
                this.emailService.send(user.email, `support@ubbcluj.ro.`, `Reset password`, `http://localhost:4200/password/${passwordToken}`);
                success(true);
            });
        });
    }

    public getUserByPasswordToken(token: any, success: Function, fail: Function) {
        this.User.findOne({ passwordToken: token }).exec(this.replay(success, fail));
    }

    public deleteUser(id: any, success: Function, fail: Function) {
        this.User.deleteOne({ _id: id }).exec(this.replay(success, fail));
    }

    private generateToken() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (var i = 0; i < passwordTokenLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public getUserByToken(token: any, success: Function, fail: Function) {
        this.User.findOne({ token: token }, this.replay(success, fail));
    }

    public getUserbyEmail(email: any, success: Function, fail: Function) {
        this.User.findOne({ email: email }, this.replay(success, fail));
    }

    public getUsers(success: Function, fail: Function) {
        this.User.find(this.replay(success, fail));
    }
}
