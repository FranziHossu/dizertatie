/** Routers */
import {AbstractRouter} from '../util/shared/abstract.router';

/** Models */
import {Request, Response} from 'express';

/** Managers */
import {NotificationManager} from './notification.manager';
import {MailService} from "../util/shared/mail.service";


export class NotificationRouter extends AbstractRouter {
    private mailService: MailService = new MailService();
    private notificationManager: NotificationManager = new NotificationManager();

    protected initRoutes() {
        this.router.get(`/api/notifications/:id`, this.getNotifications.bind(this));

        this.router.post(`/api/notification`, this.createNotification.bind(this));
    }

    private getNotifications(request: Request, response: Response) {
        this.notificationManager.getNotifications(request.params.id, (data: any) => {

            response.status(200).json(data);
        }, (error: any) => {
            response.status(500).json(null);
        })
    }

    private createNotification(request: Request, response: Response) {
        this.notificationManager.createNotification(request.body, (data: any) => {

            response.status(200).json(data);
        }, (error: any) => {
            response.status(500).json(null);
        })
    }
}
