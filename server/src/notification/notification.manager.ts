import {Model} from 'mongoose';
import {INotification, notificationSchema} from './notification.model';
import {AbstractManager} from '../util/shared/abstract.manager';

export class NotificationManager extends AbstractManager {
    private Notification: Model<INotification>;

    protected initModel() {
        this.Notification = this.connection.model<INotification>('Notification', notificationSchema);
    }

    public createNotification(body: any, success: Function, fail: Function) {
        this.Notification.create(body, this.replay(success, fail));
    }

    getNotifications(id: any, success: Function, fail: Function) {
        this.Notification.find({target: id}).sort({time: -1}).exec(this.replay(success, fail));
    }
}
